import linecheckPayload from '../assets/linecheck_payload.json';
import type {
  LinecheckPayload,
  SectionName,
  SectionType,
} from '../types/linecheck';

/**
 * Get data for a specific section from the Linecheck payload
 * @param sectionName - The name of the section to retrieve
 * @returns The section data or null if section doesn't exist
 */
export function getSectionData<T extends SectionName>(
  sectionName: T,
): SectionType<T> | null {
  if (!sectionName || typeof sectionName !== 'string') {
    console.warn('getSectionData: sectionName must be a non-empty string');
    return null;
  }

  const section = linecheckPayload[sectionName];

  if (!section) {
    console.warn(
      `getSectionData: Section "${sectionName}" not found. Available sections:`,
      Object.keys(linecheckPayload),
    );
    return null;
  }

  // Use unknown first to avoid type assertion issues
  return section as unknown as SectionType<T>;
}

/**
 * Get all available section names from the Linecheck payload
 * @returns Array of available section names
 */
export function getAvailableSections(): SectionName[] {
  return Object.keys(linecheckPayload) as SectionName[];
}

/**
 * Get the entire Linecheck payload data
 * @returns The complete payload data
 */
export function getAllData(): LinecheckPayload {
  return linecheckPayload as LinecheckPayload;
}

// Type-safe section getters for better developer experience
export function getSiteData() {
  return getSectionData('site');
}

export function getHeaderData() {
  return getSectionData('header');
}

export function getHeroData() {
  return getSectionData('hero');
}

export function getWelcomeData() {
  return getSectionData('welcome');
}

export function getGalleryData() {
  return getSectionData('gallery');
}

export function getManifestoData() {
  return getSectionData('manifesto');
}

export function getTicketsData() {
  return getSectionData('tickets');
}

export function getFooterData() {
  return getSectionData('footer');
}
