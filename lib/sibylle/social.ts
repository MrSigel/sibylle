export type SocialPost = {
  id: string;
  url: string;
  shortcode: string;
  media_type: string;
  created_at: string;
};

export type ParsedInstagram = {
  type: 'p' | 'reel' | 'tv';
  shortcode: string;
  url: string;
};

// Accepts any Instagram post/reel/tv link (with or without protocol / query
// params) and returns the normalized type + shortcode, or null if it is not a
// valid Instagram content link.
export function parseInstagramUrl(input: string): ParsedInstagram | null {
  if (!input) return null;
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');
  if (host !== 'instagram.com' && !host.endsWith('.instagram.com')) return null;

  const match = parsed.pathname.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (!match) return null;

  const type = (match[1] === 'reels' ? 'reel' : match[1]) as ParsedInstagram['type'];
  const shortcode = match[2];

  return { type, shortcode, url: `https://www.instagram.com/${type}/${shortcode}/` };
}

// Instagram's official embed endpoint - works as an <iframe> src without any
// API token. Falls back to a post embed for unknown media types.
export function instagramEmbedUrl(post: { media_type?: string; shortcode: string }): string {
  const type = post.media_type === 'reel' || post.media_type === 'tv' ? post.media_type : 'p';
  return `https://www.instagram.com/${type}/${post.shortcode}/embed`;
}
