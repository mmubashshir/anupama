interface PlaceholderImageArgs {
  /**@defaultValue 600 */
  width?: number;
  /**@defaultValue 400 */
  height?: number;
  /**@defaultValue 'Anupama' */
  text?: string;
  /**@defaultValue 'svg' */
  format?: 'svg' | 'webp' | 'png' | 'jpeg';
}

/**
 * Generates a URL for a placeholder image using placehold.co service
 * @param args - Configuration object for the placeholder image
 * @returns  Complete URL string for the placeholder image
 * @example
 * getPlaceholderImage(\{ width: 300, height: 200, text: 'Hello+World', format: 'png' \})
 * // returns "https://placehold.co/300x200/png?text=Hello+World"
 */
function getPlaceholderImage(args?: PlaceholderImageArgs): string {
  const {
    width = 600,
    height = 400,
    text = 'Anupama',
    format = 'svg',
  } = args ?? {};

  const url = new URL(`https://placehold.co/${width}x${height}/${format}`);

  url.searchParams.append('text', text);

  return url.toString();
}

export { getPlaceholderImage };
