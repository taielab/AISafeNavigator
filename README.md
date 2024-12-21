# 🛡️ AI Safe Navigator

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <img src="public/images/aiseckit-logo.png" alt="AI Safe Navigator Logo" width="200"/>
</p>

<p align="center">
  <strong>🔒 A Safe and Reliable AI Tools Navigation & Resource Management Platform</strong>
</p>

[English](README.md) | [简体中文](README.zh-CN.md)

</div>

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🌩️ Deployment](#️-deployment)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Development](#️-development)
- [🌍 Internationalization](#-internationalization)
- [📦 Dependencies](#-dependencies)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [📧 Contact](#-contact)

## ✨ Features

### 🎯 Core Features

- **AI Tools Navigation**
  - Smart Classification System
  - Advanced Search Functionality
  - Tool Rating & Reviews
  - Favorites Management

- **Security Assurance**
  - Tool Safety Assessment
  - User Privacy Protection
  - Data Encryption
  - Real-time Threat Detection

### 🎨 Technical Features

- **Modern Tech Stack**
  - Next.js 14 App Router
  - TypeScript Type Safety
  - Tailwind CSS Styling
  - Supabase Backend

- **Performance Optimization**
  - Automatic Image Optimization
  - Incremental Static Regeneration
  - Automatic Code Splitting
  - Smart Caching Strategy

### 🌐 Global Support

- **Multi-language Support**
  - English & Chinese Interfaces
  - Dynamic Language Switching
  - i18n Route Support
  - Automatic Language Detection

- **SEO Optimization**
  - Dynamic Meta Tags
  - Structured Data
  - Sitemap Generation
  - Search Engine Optimization

## 🎯 Project Showcase

<div align="center">
  <img src="public/images/screenshot-1.png" alt="Homepage Screenshot" width="600"/>
  <p><em>Modern User Interface Design</em></p>
</div>

<div align="center">
  <img src="public/images/screenshot-2.png" alt="Features Showcase" width="600"/>
  <p><em>Powerful Tool Management Features</em></p>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/taielab/AISafeNavigator.git
cd AISafeNavigator
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to view your application.

## 🌩️ Deployment

### Environment Variable Configuration

Configure your environment variables in `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=           # Your site URL (e.g., http://localhost:3000)
NEXT_PUBLIC_APP_NAME=           # Your application name
NEXT_PUBLIC_CONTACT_EMAIL=      # Contact email address
NEXT_BASE_API=                  # Base API URL

# Social Media Configuration
NEXT_PUBLIC_SHARE_HASHTAGS=     # Social media sharing hashtags (comma-separated)
NEXT_PUBLIC_TWITTER_HANDLE=     # Twitter handle
NEXT_PUBLIC_GITHUB_REPO=        # GitHub repository name

# Analytics & Ads Configuration
NEXT_PUBLIC_GOOGLE_TRACKING_ID= # Google Analytics tracking ID
NEXT_PUBLIC_GOOGLE_ADSENSE_URL= # Google AdSense script URL

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anonymous key

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=  # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=     # Sanity dataset name
SANITY_API_TOKEN=               # Sanity API token

# SEO Configuration
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=  # Google site verification code
NEXT_PUBLIC_BING_SITE_VERIFICATION=    # Bing site verification code
NEXT_PUBLIC_BAIDU_SITE_VERIFICATION=   # Baidu site verification code
NEXT_PUBLIC_DEFAULT_OG_IMAGE=          # Default Open Graph image path
NEXT_PUBLIC_DEFAULT_DESCRIPTION=        # Default meta description

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=   # Enable/disable analytics (true/false)
NEXT_PUBLIC_ENABLE_NEWSLETTER=  # Enable/disable newsletter (true/false)
NEXT_PUBLIC_ENABLE_COMMENTS=    # Enable/disable comments (true/false)

# Cache Configuration
NEXT_PUBLIC_CACHE_MAX_AGE=      # Maximum cache age in seconds
NEXT_PUBLIC_STALE_WHILE_REVALIDATE=  # Stale while revalidate duration

# API Keys & Security
CRAWLER_API=                    # Web crawler API endpoint
CRAWLER_API_KEY=                # Crawler API authentication key
CRON_AUTH_KEY=                  # Cron jobs authentication key
SUBMIT_AUTH_KEY=                # Submission API authentication key

# Development Configuration
NODE_ENV=                       # Environment (development/production)
NEXT_PUBLIC_API_MOCKING=        # API mocking configuration
```

### Vercel Deployment

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Import your forked repository
4. Configure the following environment variables in Vercel:

```bash

# Site Configuration

NEXT_PUBLIC_SITE_URL=           # Your site URL (e.g., <http://localhost:3000>)
NEXT_PUBLIC_APP_NAME=           # Your application name
NEXT_PUBLIC_CONTACT_EMAIL=      # Contact email address
NEXT_BASE_API=                  # Base API URL

# Social Media Configuration

NEXT_PUBLIC_SHARE_HASHTAGS=     # Social media sharing hashtags (comma-separated)
NEXT_PUBLIC_TWITTER_HANDLE=     # Twitter handle
NEXT_PUBLIC_GITHUB_REPO=        # GitHub repository name

# Analytics & Ads Configuration

NEXT_PUBLIC_GOOGLE_TRACKING_ID= # Google Analytics tracking ID
NEXT_PUBLIC_GOOGLE_ADSENSE_URL= # Google AdSense script URL

# Supabase Configuration

NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anonymous key

# Sanity Configuration

NEXT_PUBLIC_SANITY_PROJECT_ID=  # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=     # Sanity dataset name
SANITY_API_TOKEN=               # Sanity API token

# SEO Configuration

NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=  # Google site verification code
NEXT_PUBLIC_BING_SITE_VERIFICATION=    # Bing site verification code
NEXT_PUBLIC_BAIDU_SITE_VERIFICATION=   # Baidu site verification code
NEXT_PUBLIC_DEFAULT_OG_IMAGE=          # Default Open Graph image path
NEXT_PUBLIC_DEFAULT_DESCRIPTION=        # Default meta description

# Feature Flags

NEXT_PUBLIC_ENABLE_ANALYTICS=   # Enable/disable analytics (true/false)
NEXT_PUBLIC_ENABLE_NEWSLETTER=  # Enable/disable newsletter (true/false)
NEXT_PUBLIC_ENABLE_COMMENTS=    # Enable/disable comments (true/false)

# Cache Configuration

NEXT_PUBLIC_CACHE_MAX_AGE=      # Maximum cache age in seconds
NEXT_PUBLIC_STALE_WHILE_REVALIDATE=  # Stale while revalidate duration

# API Keys & Security

CRAWLER_API=                    # Web crawler API endpoint
CRAWLER_API_KEY=                # Crawler API authentication key
CRON_AUTH_KEY=                  # Cron jobs authentication key
SUBMIT_AUTH_KEY=                # Submission API authentication key

# Development Configuration

NODE_ENV=                       # Environment (development/production)
NEXT_PUBLIC_API_MOCKING=        # API mocking configuration
```

5. Click "Deploy" button to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fai-safe-navigator)

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project credentials from the Settings > API
3. Use the provided SQL script to initialize your database in the `db/` directory
4. If needed, set up authentication providers
5. Configure row-level security (RLS)
6. Add the following environment variables in local `.env.local` and Vercel project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🏗️ Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── messages/           # Internationalization messages
├── middlewares/        # Custom middleware
├── public/             # Static assets
└── styles/             # Global styles and Tailwind configuration
```

## 🛠️ Development

### Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Fix ESLint errors
- `pnpm prettier`: Format code

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for Git hooks
- TypeScript for type checking

## 🌍 Internationalization

The application supports multiple languages using `next-intl`. Language files are located in the `messages/` directory.

## 🎨 UI Components

- Tailwind CSS-customizable UI components
- Responsive design mode
- Dark mode support
- Optimized image components with blur effect

## 📦 Dependencies

### Core
- Next.js 14.1.4
- React 18.2.0
- TypeScript 5.4.3
- Tailwind CSS 3.4.3

### UI
- Radix UI components
- Framer Motion
- Lucide React icons

### Data Management
- React Hook Form
- Zod for validation
- Supabase

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please submit Pull Requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue in the GitHub repository.

## 📊 Performance Metrics

| Metric | Score |
|--------|-------|
| Performance | 98/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

## 🔧 System Requirements

| Dependency | Minimum Version | Recommended Version |
|------------|-----------------|-------------------|
| Node.js | 20.0.0 | 20.11.0 |
| pnpm | 8.0.0 | 8.15.1 |
| Memory | 4GB | 8GB |
| Storage | 1GB | 2GB |

## 📱 Browser Support

| Browser | Supported Version |
|---------|------------------|
| Chrome | >= 90 |
| Firefox | >= 85 |
| Safari | >= 14 |
| Edge | >= 90 |

## 🔐 Security Features

- **Data Encryption**
  - Transport Layer Security (TLS)
  - End-to-End Encryption
  - Secure Key Management

- **Access Control**
  - Role-Based Permissions
  - Multi-Factor Authentication
  - Session Management

- **Compliance**
  - GDPR Compliant
  - CCPA Compliant
  - Data Localization

## 🚦 Development Status

![Build Status](https://img.shields.io/github/workflow/status/taielab/AISafeNavigator/CI?style=for-the-badge)
![Test Coverage](https://img.shields.io/codecov/c/github/taielab/AISafeNavigator?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/taielab/AISafeNavigator?style=for-the-badge)

## 📈 Roadmap

- [x] Basic Features Implementation
- [x] Internationalization Support
- [x] Performance Optimization
- [ ] Mobile App Development
- [ ] API Documentation
- [ ] More Language Support

