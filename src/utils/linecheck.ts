import type {
  LinecheckPayload,
  SectionName,
  SectionType,
} from '@/types/linecheck';

let cachedPayload: LinecheckPayload | null = null;

export async function loadLinecheckData(
  forceReload: boolean = false,
): Promise<LinecheckPayload> {
  if (cachedPayload && !forceReload) {
    return cachedPayload;
  }

  const localUrl = new URL('@/assets/linecheck_payload.json', import.meta.url);

  const minimumDisplayDelayMs = 1000;
  const minimumDelay = new Promise((resolve) =>
    setTimeout(resolve, minimumDisplayDelayMs),
  );
  const fontsReady: Promise<void> =
    (document as any).fonts?.ready ?? Promise.resolve();

  async function fetchJson(url: string | URL): Promise<LinecheckPayload> {
    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  const data = await fetchJson(localUrl);
  await Promise.all([minimumDelay, fontsReady]);
  console.log('[linecheck] Data loaded from local file');
  cachedPayload = data;
  return data;
}

export function getAllData(): LinecheckPayload {
  if (!cachedPayload) {
    throw new Error(
      'Linecheck data not loaded. Call loadLinecheckData() first.',
    );
  }
  return cachedPayload;
}

export function getSectionData<T extends SectionName>(
  sectionName: T,
): SectionType<T> | null {
  if (!cachedPayload) {
    console.warn('getSectionData called before data load; returning null');
    return null;
  }
  const section = (cachedPayload as any)[sectionName];
  return (section ?? null) as SectionType<T> | null;
}

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
