---
title: "24/5 Stock Market Heat Map"
description: "Real-time interactive heat map visualizing overnight stock trading data for S&P 500 and NASDAQ 100 indices using Robinhood's 24/5 trading platform."
startDate: 12/1/2024
tags: ["Python", "Dash", "Plotly", "asyncio", "aiohttp", "Data Visualization", "Finance", "Web App"]
link: "https://github.com/p-o-f/overnight-map"
featured: true
current: false
---

A real-time stock market visualization tool that tracks extended-hours trading activity on Robinhood's 24/5 (24 hours, 5 days a week) platform. The application displays live data for S&P 500 and NASDAQ 100 stocks through interactive treemap heat maps and sortable tables.

## The Problem

With the introduction of 24/5 trading on Robinhood (trading available from 8 PM Friday to 8 PM Sunday ET), investors needed a way to:
- Track which stocks support overnight trading
- Monitor real-time price movements during extended hours
- Visualize market sentiment across sectors during non-traditional trading times
- Compare overnight activity patterns between major indices

Traditional market dashboards weren't designed for this new trading paradigm and lacked sector-level overnight trading insights.

## The Solution

Built a high-performance web application that provides:

### Real-Time Visualization
- **Interactive Treemap Heat Maps**: Color-coded by percent change (-3% to +3%) with market cap-weighted sizing
- **Sector & Subsector Grouping**: Hierarchical organization showing GICS sector classifications
- **Dual Index Support**: Separate views for S&P 500 and NASDAQ 100
- **Overnight Trading Indicators**: Visual distinction between stocks with 24/5 trading enabled vs disabled

### Performance Optimization
- **Async Data Fetching**: Concurrent API requests using `asyncio` and `aiohttp` with configurable concurrency (30 simultaneous requests)
- **Intelligent Caching**: 
  - Index composition cached for 24 hours (Wikipedia data)
  - Instrument ID caching to reduce redundant API calls
  - Pre-rendered table generation
- **Exponential Backoff**: Automatic retry logic with 3-attempt limit for failed requests
- **Weekend Scheduling**: Automatic refresh suspension during 24/5 downtime periods

### Data Processing
- **Multi-Source Integration**:
  - Wikipedia for S&P 500 and NASDAQ 100 composition
  - Robinhood API for live quotes, fundamentals, and extended-hours pricing
- **Comprehensive Metrics**:
  - Last trade price, extended hours price, previous close
  - Market cap, volume, average volume
  - Dollar and percent change calculations
  - Overnight trading status per symbol

### User Experience
- **Multiple View Modes**: Heat map and sortable table views for each index
- **Auto-Refresh**: Background scheduler updates data every minute during market hours
- **Responsive Design**: Mobile-optimized layout with custom CSS
- **Rich Hover Data**: Detailed tooltips showing price, volume, sector hierarchy, and overnight trading status
- **Google Analytics Integration**: User behavior tracking

## Tech Stack

### Backend & Core
- **Python 3.x** - Core application logic
- **Dash** - Web framework built on Flask
- **Plotly** - Interactive visualization library with treemap support
- **pandas** - Data manipulation and analysis
- **numpy** - Numerical operations and transformations

### Async & Performance
- **asyncio** - Asynchronous I/O for concurrent operations
- **aiohttp** - Async HTTP client for parallel API requests
- **APScheduler** - Background task scheduling with cron-like triggers

### APIs & Data Sources
- **Robinhood API** (unofficial):
  - `/quotes/{symbol}` - Instrument IDs and basic quotes
  - `/marketdata/fundamentals/{id}` - Market cap, volume data
  - `/instruments/{id}/detail-page-live-updating-data/` - Live quotes and extended hours pricing
- **Wikipedia Tables** (via wikitable2json API):
  - S&P 500 company list with GICS sectors
  - NASDAQ 100 company list with GICS sectors

### Deployment
- **Gunicorn** - WSGI HTTP server
- **Vercel/Cloud Platform** - Hosting (inferred from structure)
- **dash-bootstrap-components** - Enhanced UI components

## Architecture Highlights

### Async Data Pipeline
```python
# Concurrent fetching with semaphore-based rate limiting
async def fetch_all_symbols(symbols):
    connector = aiohttp.TCPConnector(limit=CONCURRENT_REQUESTS)
    sem = asyncio.Semaphore(CONCURRENT_REQUESTS)
    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [fetch_symbol_metrics_limited(session, symbol, sem) 
                 for symbol in symbols]
        results = await asyncio.gather(*tasks)
    return results
```

### Smart Caching Strategy
- **Instrument ID Cache**: Dictionary mapping symbols to IDs, persists across refreshes
- **Index Composition Cache**: 24-hour TTL for company lists (rarely change)
- **Pre-rendered Components**: Tables generated once and reused until next data refresh

### Scheduler Design
```python
# APScheduler with conditional execution
def run_scheduled_refresh():
    if not skipRefreshDueToWeekend():
        load_figures()  # Full data refresh
    else:
        print("Weekend mode. Skipping refresh.")

scheduler.add_job(func=run_scheduled_refresh, trigger="interval", minutes=1)
```

### Visualization Techniques
- **Power Transformation**: Market cap values raised to 0.6 power for better visual balance
- **Custom Color Scale**: 7-point diverging scale emphasizing ±1% thresholds
- **Dynamic Titles**: Live timestamps in ET timezone with overnight trading counts
- **Hover Template Customization**: Context-aware tooltips based on hierarchy level

### Weekend Trading Detection
```python
def skipRefreshDueToWeekend():
    # RH 24-5 trading: Friday 8 PM - Sunday 8 PM ET
    weekday = now.weekday()
    current_time = now.time()
    
    if weekday == 4 and current_time > time(20, 0):  # Friday after 8 PM
        return True
    elif weekday == 5:  # All day Saturday
        return True
    elif weekday == 6 and current_time < time(20, 0):  # Sunday before 8 PM
        return True
    return False
```

## Key Features

### Data Accuracy
- Handles adjusted previous close for accurate percent change calculations
- Filters out duplicate symbols (e.g., GOOGL vs GOOG)
- Graceful handling of failed API requests with retry logic
- Validation of null/missing price data

### UI/UX Polish
- Color-coded percent changes with intuitive red/green/gray palette
- Mobile-responsive with viewport meta tags
- Loading states while data initializes
- Tab-based navigation between indices and view modes
- Donation link integration (Buy Me a Coffee)

### Performance Metrics
- Initial load time: ~2-3 seconds for dual-index fetch (500+ symbols)
- Refresh cycle: 1 minute during trading hours
- Concurrent request limit: 30 (tunable based on network)
- Index cache TTL: 24 hours

## Challenges & Solutions

### Challenge 1: API Rate Limiting
**Problem**: Robinhood's unofficial API has undocumented rate limits
**Solution**: Implemented semaphore-based concurrency control with exponential backoff and configurable request limits

### Challenge 2: Extended Hours Data Complexity
**Problem**: Multiple price fields (last_trade_price, last_non_reg_price, last_extended_hours_trade_price) with unclear precedence
**Solution**: Hierarchical fallback logic: `last_non_reg_price → last_trade_price → extended_hours_price`

### Challenge 3: Market Cap Visualization
**Problem**: Large-cap stocks (AAPL, MSFT) dominate visual space
**Solution**: Power transformation (^0.6) on market cap values for balanced sizing

### Challenge 4: Hover Text Formatting
**Problem**: Plotly treemap doesn't support per-node custom hover templates
**Solution**: Dynamic customdata array transformation based on hierarchy level (symbol vs subsector vs sector)

### Challenge 5: Weekend Scheduling
**Problem**: Wasted resources refreshing during 24/5 downtime
**Solution**: Timezone-aware scheduling with day/time-based skip logic

## What I Learned

- **Async Python Patterns**: Mastered `asyncio.gather()`, semaphores, and connection pooling
- **Financial Data APIs**: Reverse-engineered Robinhood's quote/fundamental endpoints
- **Visualization Trade-offs**: Balancing information density with readability in treemaps
- **Production Scheduling**: APScheduler integration with proper cleanup handlers
- **Performance Optimization**: Caching strategies for different data staleness requirements
- **Timezone Handling**: `pytz` for accurate ET-based weekend detection

## Future Enhancements

- [ ] User authentication for personalized watchlists
- [ ] Historical price charts on hover/click
- [ ] Alert system for significant overnight moves
- [ ] Comparison mode (current session vs previous session)
- [ ] Options activity integration
- [ ] Dark/light theme toggle
- [ ] Export data to CSV/JSON
- [ ] Mobile app version

## Links

- **Live Demo**: [247map.com](https://247map.com) (mentioned in code comments)
- **GitHub**: [p-o-f/overnight-map](https://github.com/p-o-f/overnight-map)
- **Support**: [Buy Me a Coffee](https://buymeacoffee.com/pfdev)

## Impact

The application serves retail traders who utilize Robinhood's extended trading hours, providing them with sector-level insights not available on traditional platforms. The visual heat map format makes it easy to identify overnight trading patterns and sector rotation at a glance.
