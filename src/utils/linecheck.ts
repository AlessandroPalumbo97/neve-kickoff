import type {
  LinecheckPayload,
  SectionName,
  SectionType,
} from '../types/linecheck';

let cachedPayload: LinecheckPayload | null = null;

export async function loadLinecheckData(
  forceReload: boolean = false,
): Promise<LinecheckPayload> {
  if (cachedPayload && !forceReload) {
    return cachedPayload;
  }

  const REMOTE_URL =
    'https://file.notion.so/f/f/0172dd58-cbed-4d35-a11f-40637cf6da9a/59b40c0e-c1c4-45c2-bd74-dfe2caebb644/linecheck_payload.json?table=block&id=24d19c53-657c-803c-8539-c4cde88d9072&spaceId=0172dd58-cbed-4d35-a11f-40637cf6da9a&expirationTimestamp=1757016000000&signature=i5PQ78EPS3Qdfd0ECVeyUG1mjIfr0vZPA4-QVv3oJy4&downloadName=linecheck_payload.json';

  const localUrl = new URL(
    '../../assets/linecheck_payload.json',
    import.meta.url,
  );

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

  try {
    const data = await fetchJson(REMOTE_URL);
    await Promise.all([minimumDelay, fontsReady]);
    console.log('[linecheck] Data loaded from remote URL');
    cachedPayload = data;
    return data;
  } catch {
    const data = await fetchJson(localUrl);
    await Promise.all([minimumDelay, fontsReady]);
    console.log('[linecheck] Data loaded from local fallback');
    cachedPayload = data;
    return data;
  }
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
