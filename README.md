# Linecheck 2025 - Festival Kickoff Website

_✨ A fully responsive, interactive festival experience with custom animations, tooltips, and smooth transitions_

## 🌟 Live Demo

[❄️ **neve-kickoff.netlify.app**](https://neve-kickoff.netlify.app/)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd neve-kickoff

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The development server will start at `http://localhost:5173`

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.2** - Type-safe development
- **Vite 7.1.2** - Lightning-fast build tool and dev server

### Styling & UI

- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Custom CSS Utilities** - Tailored design system with custom tokens
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### Key Libraries

- **Flickity 3.0.0** - Touch-friendly carousel functionality
- **React Icons 5.5.0** - Comprehensive icon library
- **html-react-parser 5.2.6** - Safe HTML parsing for dynamic content
- **clsx 2.1.1** - Conditional className utility

### Development Tools

- **ESLint** - Code linting with React and accessibility rules
- **Prettier** - Code formatting with Tailwind CSS plugin
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Header, Menu, SiteContent
│   ├── sections/         # Main page sections
│   │   ├── Hero/         # Landing hero section
│   │   ├── WelcomeGallery/ # Image gallery with lightbox
│   │   ├── Manifesto/    # Festival manifesto
│   │   ├── News/         # News carousel
│   │   ├── Tickets/      # Ticket cards with tooltips
│   │   ├── Crosslinks/   # Navigation blocks
│   │   └── Footer/       # Footer components
│   └── ui/              # Reusable UI components
│       ├── PortalTooltip.tsx    # Custom tooltip system
│       ├── DesktopCarousel.tsx  # Desktop carousel
│       ├── MobileCarousel.tsx   # Mobile carousel
│       ├── GalleryLightbox.tsx  # Image lightbox
│       └── ReadMore.tsx         # Expandable text
├── contexts/            # React contexts
│   └── LoadingContext.tsx # Loading overlay management
├── hooks/               # Custom React hooks
│   ├── useAnimateOnView.ts # Intersection Observer animations
│   └── useInView.ts        # Viewport detection
├── utils/               # Utility functions
│   └── linecheck.ts        # Data loading and processing
├── types/               # TypeScript type definitions
│   └── linecheck.ts        # Data structure types
├── assets/              # Static assets
│   ├── fonts/              # Custom fonts (TRJNDaVinci, Arial Narrow)
│   ├── icons/              # SVG icon components
│   └── linecheck_payload.json # Content data
└── index.css            # Global styles and design system
```

## 🎨 Site Sections

### Header & Menu

- **Responsive navigation** with mobile hamburger menu
- **Dynamic menu structure** from JSON configuration
- **Nested dropdown menus** with smooth animations
- **CTA button** integration in header
- **Logo animation** with custom SVG rendering
- **Mobile-optimized** arrow positioning for proper text alignment

### Hero Section

- **Animated logo** with custom SVG integration
- **Dynamic content** from JSON payload
- **Responsive typography** with custom font scaling
- **Background image** with overlay effects

### Welcome Gallery

- **Interactive image grid** with hover effects
- **Lightbox functionality** with Flickity carousel
- **Grayscale to color** transitions
- **Responsive grid** layout (2-6 columns based on screen size)

### Manifesto

- **Rich text content** with HTML parsing
- **Read more/less** functionality for mobile
- **Custom typography** with accent underlines
- **Smooth animations** on scroll

### News Section

- **Horizontal carousel** with custom controls
- **Responsive breakpoints** (1-4 items visible)
- **Touch/swipe support** for mobile
- **News item cards** with image and metadata

### Tickets Section

- **Interactive ticket cards** with hover effects
- **Custom tooltip system** with portal rendering
- **Price display** with currency formatting
- **Sold out states** with visual indicators
- **Responsive carousel** layout

### Crosslinks

- **Navigation blocks** with hover animations
- **Custom arrow animations** on hover
- **Color-coded sections** (accent/black themes)
- **Responsive typography** scaling

### Footer

- **Multi-column layout** with navigation
- **Newsletter signup** with animated arrow
- **Social links** and credits
- **Responsive design** with mobile optimization

## 📊 Data Loading & Management

### Content Structure

All content is managed through a centralized JSON file (`linecheck_payload.json`) containing:

- **Site configuration** (name, base URL, theme)
- **Header data** (logo, menu structure, CTA)
- **Section content** (hero, welcome, manifesto, news, tickets)
- **Footer data** (navigation, newsletter, credits)

### Data Loading System

```typescript
// Centralized data loading
import { getHeaderData, getTicketsData, getNewsData } from '@/utils/linecheck';

// Type-safe data access
const headerData = getHeaderData();
const ticketsData = getTicketsData();
```

### Key Features

- **Type-safe data access** with TypeScript interfaces
- **Centralized content management** through JSON
- **Error handling** for missing data
- **Performance optimization** with selective data loading

## ✨ Key Features & Notable Implementations

### Custom Tooltip System

- **Portal-based rendering** to escape stacking contexts
- **Smart positioning** with viewport boundary detection
- **Hover interactions** with smooth transitions
- **Accessible design** with proper ARIA attributes

### Loading Overlay Effect

- **Smooth fade transitions** (700ms duration)
- **Context-based state management** for animation timing
- **Scroll position restoration** after loading
- **Performance optimization** with proper cleanup

### Animation System

- **Intersection Observer** based animations
- **Blur and slide effects** on scroll
- **Custom timing** and easing functions
- **Performance optimized** with CSS transforms

### Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Custom breakpoints** optimized for content
- **Flexible grid systems** with CSS Grid and Flexbox
- **Touch-friendly interactions** for mobile devices

### Performance Optimizations

- **Code splitting** with dynamic imports
- **Image optimization** with proper sizing
- **CSS optimization** with unused class removal
- **Bundle size optimization** (CSS: 29.94 kB, JS: 319.42 kB)

### SEO & Accessibility

- **Semantic HTML** structure
- **Proper heading hierarchy** (h1-h6)
- **Alt text** for all images
- **ARIA labels** for interactive elements
- **Keyboard navigation** support

## 🎯 Development Guidelines

### Code Style

- **TypeScript** for type safety
- **ESLint** configuration with React and accessibility rules
- **Prettier** for consistent formatting
- **Component-based architecture** with clear separation of concerns

### CSS Organization

- **Design system** with custom CSS variables
- **Utility-first approach** with Tailwind CSS
- **Component-specific styles** in dedicated sections
- **Responsive design** with mobile-first breakpoints

### Component Naming

- **PascalCase** for components (`TicketItemCard.tsx`)
- **camelCase** for utilities (`useAnimateOnView.ts`)
- **kebab-case** for CSS classes (`.menu-link-arrow`)

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Output directory: dist/
# Optimized assets with hashed filenames
# Minified CSS and JavaScript
```

### Environment Considerations

- **Static site** - can be deployed to any static hosting
- **No environment variables** required
- **CDN-friendly** with proper cache headers
- **HTTPS recommended** for production

### Performance Metrics

- **Lighthouse Score**: Optimized for performance
- **Bundle Size**: CSS 29.94 kB, JS 319.42 kB
- **Load Time**: Optimized with Vite's build system
- **Mobile Performance**: Touch-optimized interactions

## 🔧 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **ES2020+** features with Vite's polyfill system
- **CSS Grid** and **Flexbox** support required
- **Touch events** for mobile interactions

---

**Built with ❤️ for the Linecheck 2025 Festival**
