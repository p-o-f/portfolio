---
title: "MyAlyce - Smartwatch Health Monitoring Platform"
description: "A comprehensive health data monitoring application for Amazfit Balance smartwatch supporting individuals in addiction recovery."
startDate: 9/1/2025
endDate: 4/1/2025
tags:
  ["Zepp OS", "JavaScript", "Node.js", "Google Drive API", "OAuth 2.0", "IoT"]
link: "https://github.com/MyAlyce/ASU_OD_detection_project"
featured: true
current: false
---

MyAlyce is a comprehensive health data monitoring application built for the Amazfit Balance smartwatch running on Zepp OS. The platform serves as a supportive tool for individuals in addiction recovery by collecting vital health metrics and seamlessly integrating them with Google Drive for remote monitoring and support.

## The Problem

Individuals recovering from substance abuse need continuous support and monitoring. Traditional check-ins can be infrequent, and early warning signs of distress may go unnoticed. MyAlyce bridges this gap by providing real-time health monitoring that can be shared with support networks, counselors, and healthcare providers.

## The Solution

MyAlyce provides comprehensive health monitoring with cloud integration:

### Real-Time Health Monitoring

- **Heart Rate Tracking**: Continuous heart rate monitoring with resting and active measurements
- **Sleep Analysis**: Comprehensive sleep tracking including total time, sleep stages (Deep, Light, REM, Wake), quality scores, and start/end times

### Privacy-First Design

- Granular user consent for each health metric
- Permission settings persistently stored on device
- Users control exactly what data is shared

### Cloud Data Sync

- Automated Google Drive folder creation
- Daily Google Sheets generation for organized data storage
- Periodic sync (configurable intervals) to minimize battery impact
- Data headers automatically added to sheets

### Support Network Integration

- Share health data folders with trusted contacts via email
- Role-based permissions (read-only access for contacts)
- Easy contact management through settings interface
- Remove access at any time

### Emergency Alert System

- Configure heart rate thresholds for alerts
- Set up emergency contact phone numbers
- Automatic notifications when thresholds are exceeded
- Designed to provide rapid intervention in crisis situations

## Tech Stack

### Client (Smartwatch App)

- **Zepp OS** - Native smartwatch platform for Amazfit Balance
- **JavaScript** - Core application logic
- **@zeppos/zml** - Zepp OS framework for UI and base services
- **@silver-zepp/easy-storage** - Local data persistence and time-series database
- **Zeus CLI** - Development and deployment tooling

### Server

- **Node.js** with Express - REST API backend
- **CORS** middleware for cross-origin requests

### Integrations

- **Google Drive API** - Cloud storage for health data
- **Google Sheets API** - Structured data logging with daily sheets
- **OAuth 2.0** - Secure authentication flow

## Architecture Highlights

### Client-Side Architecture

- **App Lifecycle Management**: Initialization, heart rate monitoring startup, and database cleanup
- **Background Services**: Continuous monitoring, Google Drive folder management, daily sheet creation, and periodic data sync
- **Google API Integration**: OAuth 2.0 authentication, folder/sheet management, token refresh
- **Heart Rate Monitor**: Real-time monitoring with rescue plan threshold alerts
- **Settings Interface**: Tab-based navigation, Google authentication, email-based folder sharing, emergency contact configuration

### Key Features

- **Offline-First**: Local TSDB ensures data isn't lost even without connectivity
- **State Management**: Global storage accessible throughout the app
- **Modular Design**: Separation of concerns between UI, services, and API layers
- **Error Handling**: Comprehensive promise-based error handling
- **Notification System**: Watch notifications for user feedback and alerts

## Data Flow

1. **Collection**: Sensors on smartwatch continuously gather health metrics
2. **Storage**: Data stored locally in TSDB for reliability
3. **Aggregation**: Background service collects metrics at intervals
4. **Authentication**: OAuth tokens retrieved from settings storage
5. **Sync**: Metrics sent to Google Sheets via REST API
6. **Sharing**: Support network accesses shared Google Drive folder

## Technical Challenges Solved

### Battery Life Optimization

- Configurable sync intervals (default: 1 minute data collection, periodic uploads)
- Efficient use of background services
- Local storage minimizes network calls

### OAuth on Wearables

- Companion app handles authentication flow
- Settings sync between watch and phone
- Token storage with expiration handling

### Data Organization

- Automatic daily sheet creation
- Structured folder hierarchy in Google Drive
- Headers automatically added to new sheets

### Privacy & Consent

- Granular permission system
- User explicitly enables each metric
- Easy sharing management interface

## What I Learned

This project taught me:

- **Wearable Development**: Building apps for resource-constrained devices with unique UX challenges
- **OAuth Implementation**: Handling complex authentication flows across multiple devices (watch, phone, web)
- **Cloud Integration**: Working with Google Drive and Sheets APIs for automated data management
- **Health Data Privacy**: Implementing granular permission systems for sensitive health information
- **Background Services**: Managing long-running services on battery-powered devices
- **Time-Series Data**: Efficiently storing and syncing time-series health data
- **Cross-Platform State Management**: Keeping app state synchronized between watch and companion app

## Impact

MyAlyce demonstrates how wearable technology can provide continuous, non-intrusive support for individuals in recovery. By automating health data collection and enabling secure sharing with support networks, it empowers users and their care teams with actionable insights while maintaining user privacy and control.

The platform bridges the gap between traditional check-ins and provides early warning systems through continuous monitoring, potentially enabling faster intervention during critical moments.
