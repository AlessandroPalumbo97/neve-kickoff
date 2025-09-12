# Linecheck 2025 - Neve Kickoff Project

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

- **Bundle Size**: CSS 29.94 kB, JS 319.42 kB
- **Mobile Performance**: Touch-optimized interactions

## 🔧 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **ES2020+** features with Vite's polyfill system
- **CSS Grid** and **Flexbox** support required
- **Touch events** for mobile interactions

## 🔮 Possible Improvements

While this kickoff project is fully functional and production-ready, here are some technical and organizational improvements that could enhance the codebase for future iterations:

### CSS & Styling

- **Refactor CSS classes** to eliminate arbitrary values and reduce repetition
- **Consolidate similar utility classes** into reusable design tokens
- **Implement a more systematic spacing scale** to replace hardcoded values
- **Create component-specific CSS modules** for better style encapsulation
- **Establish a comprehensive design system** with documented color, typography, and spacing scales

### Code Organization

- **Extract custom hooks** for complex state logic (e.g., carousel state management)
- **Implement error boundaries** for better error handling and user experience
- **Add comprehensive unit tests** for critical components and utilities
- **Create Storybook documentation** for component library and design system
- **Implement proper TypeScript strict mode** for enhanced type safety

### Performance & Optimization

- **Add image lazy loading** for gallery and news sections
- **Implement virtual scrolling** for large lists or data sets
- **Optimize bundle splitting** for better loading performance
- **Add service worker** for offline functionality and caching
- **Implement dynamic meta tags** for different pages/sections

### Developer Experience

- **Add pre-commit hooks** for code quality and formatting
- **Implement automated testing** in CI/CD pipeline
- **Create development environment** with hot reloading for content changes
- **Add comprehensive logging** and error tracking
- **Document component APIs** and usage patterns

### Accessibility & UX

- **Enhance keyboard navigation** for all interactive elements
- **Implement focus management** for modal and carousel interactions
- **Add screen reader optimizations** for complex UI components
- **Create high contrast mode** support
- **Implement reduced motion** preferences for animations

### Content Management

- **Implement a headless CMS** for easier content updates
- **Add content versioning** and approval workflows
- **Create admin interface** for non-technical content updates
- **Implement multi-language support** for internationalization
- **Add content scheduling** and publication workflows

### Infrastructure & Deployment

- **Implement automated deployment** with GitHub Actions
- **Add environment-specific configurations** for staging and production
- **Implement proper monitoring** and analytics
- **Add backup and disaster recovery** procedures
- **Create development and staging environments**

_Note: These improvements are suggestions for future development. The current implementation prioritizes functionality and visual fidelity, which has been successfully achieved._

## 🎭 About This Project

This is a **kickoff project** - a development prototype and learning exercise inspired by the official Linecheck 2025 festival website.

The original, professional website was designed and developed by **[neve studio](https://www.neve.dev/)** - a Milan-based design agency. This kickoff project serves as a technical exploration and educational resource, implementing similar functionality and design patterns using modern web technologies.

**Note:** This is not the official Linecheck 2025 website, but rather a tribute project showcasing React development skills and modern web practices.

## 📄 License

**Code License**: This project's source code is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Content License**: The content, design assets, and data used in this project are NOT covered by this license. They remain the exclusive property of the commissioning party and are protected under applicable copyright, intellectual property, and trade secret laws.

**Important**: This is a kickoff project inspired by the official Linecheck 2025 website designed by [neve studio](https://www.neve.dev/). The original design, content, and branding belong to neve studio and Linecheck. This project is for educational purposes only.

### What you can do with the CODE:

- ✅ Use this **source code** for learning and educational purposes
- ✅ Modify and experiment with the **code**
- ✅ Share the **code** with others for learning
- ✅ Use the **code** as a reference for your own projects
- ✅ Study the **technical implementation** and patterns

### What you CANNOT do:

- ❌ Use any **content, data, or assets** from this project
- ❌ Redistribute the **JSON payload** or design assets
- ❌ Use the **Linecheck branding/design** commercially
- ❌ Claim any **content** as your own original work
- ❌ Use any **materials** provided in the original Notion file
- ❌ Reproduce or distribute any **confidential materials**

### Legal Notice:

All materials provided (including, but not limited to, designs, assets, links, credentials, and project briefs) are the exclusive property of the commissioning party and are protected under applicable copyright, intellectual property, and trade secret laws. Any reproduction, disclosure, distribution, or use outside the scope of this educational project is strictly prohibited.

---

**Built with ❤️ for the Linecheck 2025 Festival**
