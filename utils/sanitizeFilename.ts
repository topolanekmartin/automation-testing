export const sanitizeFilename = (fileName?: string) =>
    fileName
        ? fileName
              .normalize('NFKD')
              .replace(/[^\w\s.-_\/]/g, '')
              .replace(/[/\\?%*:|"<>\s]/g, '-')
        : '[no-name]';
