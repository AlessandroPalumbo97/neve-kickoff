// Base types for common structures
export interface ImageWithSrcset {
  src?: string;
  srcset: string[];
}

export interface CTA {
  label: string;
  url: string;
  style?: string;
}

export interface MenuItem {
  label: string;
  url?: string;
  disabled?: boolean;
  children?: MenuItem[];
}

export interface SocialLink {
  label: string;
  url: string;
}

// Site section types
export interface SiteSection {
  name: string;
  baseUrl: string;
  theme: string;
}

// Header section types
export interface HeaderSection {
  cta: CTA;
  logo: {
    ariaLabel: string;
    svgUrl: string;
  };
  menu: MenuItem[];
}

// Hero section types
export interface HeroSection {
  title: string;
  subtitle: string;
  images: {
    desktop: ImageWithSrcset;
    mobile: ImageWithSrcset;
  };
}

// Welcome section types
export interface WelcomeSection {
  title: string;
  richText: string;
  ctas: CTA[];
}

// Gallery section types
export interface GalleryItem {
  thumb: string;
  full: string;
  srcset: string[];
  caption: string;
}

// Gallery section types
export interface GallerySection {
  items: GalleryItem[];
}

// Crosslinks section types
export interface CrosslinksSection {
  label: string;
  title: string;
  url: string;
  style?: string;
}

// News highlights section types
export interface NewsHighlightsSection {
  title: string;
  description: string;
  cta: CTA;
  items: Array<{
    dateLabel: string;
    categories: string[];
    title: string;
    excerpt: string;
    url: string;
    image: string;
  }>;
}

// Manifesto section types
export interface ManifestoSection {
  image: ImageWithSrcset;
  title: string;
  excerpt: string;
  cta: CTA;
}

// Ticket types
export interface TicketPrice {
  release: string;
  price: number;
  currency: string;
  soldOut: boolean;
}

export interface TicketItem {
  venue: string;
  date?: string;
  dateRange?: string[];
  title: string;
  tooltip: string;
  prices: TicketPrice[];
  buyUrl: string;
}

export interface TicketsSection {
  title: string;
  description: string;
  items: TicketItem[];
}

// Footer section types - updated to match actual JSON structure
export interface FooterNewsletter {
  label: string;
  cta: string;
  url: string;
}

export interface FooterMenus {
  primary: Array<{
    label: string;
    url: string;
    disabled?: boolean;
  }>;
  meetingFestival: {
    label: string;
    items: MenuItem[];
  };
  info: {
    label: string;
    items: Array<{
      label: string;
      url: string;
    }>;
  };
  legal: {
    label: string;
    items: Array<{
      label: string;
      url: string;
      target?: string;
      disabled?: boolean;
    }>;
  };
}

export interface FooterCredits {
  copyright: string;
  byline: string;
  bylineUrl: string;
  design: {
    label: string;
    url: string;
  };
  code: Array<{
    label: string;
    url: string;
  }>;
}

export interface FooterPartnersLogo {
  label: string;
  url: string;
  logoSvg: string;
}

export interface FooterSection {
  newsletter: FooterNewsletter;
  menus: FooterMenus;
  social: SocialLink[];
  credits: FooterCredits;
  partnersLogo: FooterPartnersLogo;
}

// Union type for all sections
export type LinecheckSection =
  | SiteSection
  | HeaderSection
  | HeroSection
  | WelcomeSection
  | GallerySection
  | CrosslinksSection
  | NewsHighlightsSection
  | ManifestoSection
  | TicketsSection
  | FooterSection;

// Main payload interface using mapped types
export interface LinecheckPayload {
  site: SiteSection;
  header: HeaderSection;
  hero: HeroSection;
  welcome: WelcomeSection;
  gallery: GallerySection;
  crosslinks: CrosslinksSection;
  newsHighlights: NewsHighlightsSection;
  manifesto: ManifestoSection;
  tickets: TicketsSection;
  footer: FooterSection;
}

// Section names as a union type
export type SectionName = keyof LinecheckPayload;

// Helper type to get the type of a specific section
export type SectionType<T extends SectionName> = LinecheckPayload[T];
