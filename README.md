# Anupama Women's Monthly Magazine

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.6-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?style=flat-square&logo=wordpress)](https://wordpress.org/)

The official website for **Anupama Women's Monthly Magazine** - Karnataka's premier women's magazine. This is a modern, responsive web application built with Next.js and powered by WordPress as a headless CMS.

## 🌟 Features

### Content Management

- **Headless WordPress CMS** - Content managed through WordPress backend
- **GraphQL Integration** - Type-safe data fetching with Apollo Client and gql.tada
- **Dynamic Content** - Real-time content updates from WordPress
- **Multi-language Support** - Kannada and English content support

### Magazine Features

- **Digital Magazine Viewer** - PDF magazine viewing with modal interface
- **Latest Magazine Display** - Automatic detection and display of latest magazine
- **Magazine Cover Preview** - High-quality magazine cover images

## 🚀 Tech Stack

### Frontend

- **Next.js** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client
- **gql.tada** - Type-safe GraphQL

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Embla Carousel** - Touch-friendly carousel
- **Material-UI** - Additional UI components
- **React PDF** - PDF viewing capabilities

### Backend Integration

- **WordPress** - Headless CMS
- **GraphQL** - Data querying
- **WordPress REST API** - Content management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **pnpm** - Package manager

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- WordPress installation with GraphQL plugin

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anupama
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_WORDPRESS_BASE_URL=https://your-wordpress-site.com/graphql
   NEXT_PUBLIC_GOOGLE_ANALYTICS=your-ga-id
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your-clarity-id
   NEXT_PUBLIC_MODE=development
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### WordPress Setup

1. Install and configure WordPress
2. Install GraphQL plugin (WPGraphQL)
3. Configure GraphQL schema
4. Set up content types and taxonomies
5. Configure CORS for headless access

### Next.js Configuration

- **Image Optimization** - Configured for WordPress and placeholder images
- **Webpack** - Custom configuration for PDF rendering
- **Environment Variables** - Type-safe environment configuration

## 📱 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format           # Format code with Prettier

# GraphQL
pnpm introspect      # Generate GraphQL types
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify** - Static site deployment
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

## 📊 Analytics & Monitoring

- **Google Analytics** - User behavior tracking
- **Microsoft Clarity** - User session recordings
- **Performance Monitoring** - Core Web Vitals tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is proprietary software for Anupama Women's Monthly Magazine.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the WordPress documentation for CMS-related issues

---

**Built with ❤️ for Anupama Women's Monthly Magazine**
