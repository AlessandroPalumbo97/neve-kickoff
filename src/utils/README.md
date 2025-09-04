# Linecheck Data Utility (TypeScript)

This utility provides functions to easily access data from the `linecheck_payload.json` file with full TypeScript support and type safety.

## 🚀 Features

- **Full TypeScript Support**: All functions are fully typed with granular interfaces
- **Type Safety**: Compile-time checking for section names and data structures
- **IntelliSense**: Full autocomplete and type hints in your IDE
- **Granular Types**: Section-specific interfaces for building focused components
- **Error Handling**: Built-in validation and helpful error messages
- **Component Ready**: Perfect for building individual section components

## 📁 Project Structure

```
src/
├── types/
│   └── linecheck.ts          # All type definitions
├── utils/
│   └── linecheckData.ts      # Utility functions
└── examples/
    ├── linecheckDataExample.tsx    # Basic usage example
    └── componentExamples.tsx       # Component building examples
```

## 🔧 Functions

### `getSectionData<T extends SectionName>(sectionName: T)`

Retrieves data for a specific section with full type safety and generic return types.

**Parameters:**

- `sectionName` (SectionName): The name of the section to retrieve (type-safe)

**Returns:**

- `SectionType<T> | null`: The section data with exact typing or null if section doesn't exist

**Example:**

```typescript
import { getSectionData } from './utils/linecheckData';

// Get hero section data (fully typed)
const heroData = getSectionData('hero');
if (heroData) {
  // TypeScript knows this is HeroSection
  console.log(heroData.title); // string
  console.log(heroData.subtitle); // string
  console.log(heroData.images.desktop.srcset); // string[]
}

// Get tickets section data
const ticketsData = getSectionData('tickets');
if (ticketsData) {
  // TypeScript knows this is TicketsSection
  console.log(ticketsData.items[0].prices[0].price); // number
  console.log(ticketsData.items[0].dateRange); // string[] | undefined
}
```

### `getAvailableSections()`

Returns an array of all available section names with proper typing.

**Returns:**

- `SectionName[]`: Array of available section names (type-safe)

**Example:**

```typescript
import { getAvailableSections } from './utils/linecheckData';

const sections = getAvailableSections();
// sections is typed as: ("site" | "header" | "hero" | "welcome" | "gallery" | "manifesto" | "tickets" | "footer")[]

sections.forEach((section) => {
  // TypeScript knows section is a valid section name
  const data = getSectionData(section); // This will always work!
});
```

### Section-Specific Getters

For convenience, we provide type-safe getters for each section:

```typescript
import {
  getSiteData,
  getHeaderData,
  getHeroData,
  getWelcomeData,
  getGalleryData,
  getManifestoData,
  getTicketsData,
  getFooterData,
} from './utils/linecheckData';

// Each returns the properly typed section data
const heroData = getHeroData(); // HeroSection | null
const ticketsData = getTicketsData(); // TicketsSection | null
```

## 🎯 Granular Types

The utility includes comprehensive, section-specific interfaces that match your exact JSON structure:

### Base Types

```typescript
interface ImageWithSrcset {
  src?: string;
  srcset: string[];
}

interface CTA {
  label: string;
  url: string;
  style?: string;
}

interface MenuItem {
  label: string;
  url?: string;
  disabled?: boolean;
  children?: MenuItem[];
}
```

### Section-Specific Types

```typescript
interface HeroSection {
  title: string;
  subtitle: string;
  images: {
    desktop: ImageWithSrcset;
    mobile: ImageWithSrcset;
  };
}

interface TicketsSection {
  title: string;
  description: string;
  items: TicketItem[];
}

interface TicketItem {
  venue: string;
  date?: string;
  dateRange?: string[]; // Handles both single dates and date ranges
  title: string;
  tooltip: string;
  prices: TicketPrice[];
  buyUrl: string;
}
```

## 🏗️ Building Components

The granular types make building components incredibly easy and type-safe:

### Hero Component Example

```typescript
import { getHeroData } from '../utils/linecheckData';
import type { HeroSection } from '../types/linecheck';

function HeroComponent(): React.JSX.Element {
  const heroData = getHeroData();

  if (!heroData) {
    return <div>Hero section not found</div>;
  }

  // TypeScript provides full autocomplete and type checking
  return (
    <section className="hero">
      <h1>{heroData.title}</h1>
      <p>{heroData.subtitle}</p>

      <div className="hero-images">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={heroData.images.desktop.srcset.join(', ')}
          />
          <img
            src={heroData.images.mobile.srcset[0]}
            alt={heroData.title}
          />
        </picture>
      </div>
    </section>
  );
}
```

### Tickets Component Example

```typescript
import { getTicketsData } from '../utils/linecheckData';
import type { TicketItem } from '../types/linecheck';

function TicketsComponent(): React.JSX.Element {
  const ticketsData = getTicketsData();

  if (!ticketsData) {
    return <div>Tickets section not found</div>;
  }

  return (
    <section className="tickets">
      <h2>{ticketsData.title}</h2>
      <p>{ticketsData.description}</p>

      <div className="ticket-items">
        {ticketsData.items.map((ticket: TicketItem, index: number) => (
          <div key={index} className="ticket-item">
            <h3>{ticket.title}</h3>
            <p className="venue">{ticket.venue}</p>

            {/* Handle both date and dateRange properties safely */}
            <p className="date">
              {ticket.date && `Date: ${ticket.date}`}
              {ticket.dateRange && `Date Range: ${ticket.dateRange.join(' - ')}`}
            </p>

            <div className="prices">
              {ticket.prices.map((price, priceIndex) => (
                <div key={priceIndex} className={`price ${price.soldOut ? 'sold-out' : ''}`}>
                  <span className="release">{price.release}</span>
                  <span className="amount">
                    {price.price} {price.currency}
                  </span>
                  {price.soldOut && <span className="status">Sold Out</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## 🎨 Available Sections

The following sections are available (all fully typed):

- **site**: Site configuration and metadata
- **header**: Navigation menu and header elements
- **hero**: Main hero section with title, subtitle, and images
- **welcome**: Welcome message and call-to-action buttons
- **gallery**: Image gallery items
- **manifesto**: Festival manifesto information
- **tickets**: Ticket information and pricing
- **footer**: Footer links, social media, and credits

## ✅ Benefits of Granular Types

1. **Component Focus**: Each component only imports the types it needs
2. **Type Safety**: Compile-time checking for exact data structures
3. **IntelliSense**: Full autocomplete for section-specific properties
4. **Refactoring Safety**: Easy to rename properties without breaking code
5. **Team Collaboration**: Clear contracts for each section's data
6. **Maintainability**: Changes to one section don't affect others
7. **Performance**: Only load the types you actually use

## 🔍 Error Handling

The functions include built-in error handling with TypeScript:

- Invalid section names will return `null` and log a warning
- Non-string parameters will return `null` and log a warning
- The console will show available sections when an invalid section is requested
- TypeScript will catch most errors at compile time

## 📚 Complete Examples

Check out the example files for full working examples:

- `linecheckDataExample.tsx` - Basic usage and data exploration
- `componentExamples.tsx` - Real-world component building examples

## 🚀 Getting Started

```typescript
import { getHeroData } from './utils/linecheckData';
import type { HeroSection } from './types/linecheck';

function MyHeroComponent(): React.JSX.Element {
  const heroData = getHeroData();

  if (!heroData) {
    return <div>Hero section not found</div>;
  }

  return (
    <div>
      <h1>{heroData.title}</h1>
      <p>{heroData.subtitle}</p>
    </div>
  );
}
```

Your TypeScript setup is now complete with granular, component-ready types! 🎯
