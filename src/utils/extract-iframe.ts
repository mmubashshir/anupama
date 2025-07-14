export function extractYouTubeIframe(html: string): string | null {
  const match = /<iframe.*?<\/iframe>/.exec(html);

  return match ? match[0] : null;
}
