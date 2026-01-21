// Site-wide configuration - edit these values once, used everywhere
export const siteConfig = {
  name: "Parthib",
  fullname: "Parthib Faruk",
  title: "Parthib's Portfolio",
  description: "Parthib's Portfolio - Parthib Faruk, Software Engineer", // usually not visible, only for SEO meta tags

  // Navigation
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ],

  // Homepage UI Configuration
  ui: {
    maxFeaturedProjects: 3,
    maxRecentPosts: 3,
  },
};

// Online Presence - Add/remove/edit your links here
// Set any link to empty string "" or remove it to hide from the site
export const socialLinks = {
  github: "https://github.com/p-o-f",
  linkedin: "https://linkedin.com/in/pfaruk",
  email: "pfaruk@asu.edu",
  resume:
    "https://drive.google.com/file/d/1Ri2qokXQp71t5kGYuQrzlvaKqSCAfMrs/view?usp=sharing", // Put resume.pdf in the /public folder

  // Add more as needed - uncomment or add new ones:
  // twitter: "https://x.com/yourusername",
  // youtube: "https://youtube.com/@yourusername",
  // instagram: "https://instagram.com/yourusername",
  // website: "https://yourwebsite.com",
};
