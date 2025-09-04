export async function loadLinecheckData(): Promise<any> {
  // Remote Notion temporary URL (time-limited)
  const REMOTE_URL =
    'https://file.notion.so/f/f/0172dd58-cbed-4d35-a11f-40637cf6da9a/59b40c0e-c1c4-45c2-bd74-dfe2caebb644/linecheck_payload.json?table=block&id=24d19c53-657c-803c-8539-c4cde88d9072&spaceId=0172dd58-cbed-4d35-a11f-40637cf6da9a&expirationTimestamp=1757016000000&signature=i5PQ78EPS3Qdfd0ECVeyUG1mjIfr0vZPA4-QVv3oJy4&downloadName=linecheck_payload.json';

  // Local fallback bundled with the app
  const localUrl = new URL(
    '../../assets/linecheck_payload.json',
    import.meta.url,
  );

  const minimumDisplayDelayMs = 1000;
  const minimumDelay = new Promise((resolve) =>
    setTimeout(resolve, minimumDisplayDelayMs),
  );
  // Wait for fonts if available to avoid FOUT during transition
  const fontsReady: Promise<void> =
    (document as any).fonts?.ready ?? Promise.resolve();

  async function fetchJson(url: string | URL): Promise<any> {
    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  try {
    const data = await fetchJson(REMOTE_URL);
    await Promise.all([minimumDelay, fontsReady]);
    console.log('[linecheck] Data loaded from remote URL');
    return data;
  } catch {
    const data = await fetchJson(localUrl);
    await Promise.all([minimumDelay, fontsReady]);
    console.log('[linecheck] Data loaded from local fallback');
    return data;
  }
}
