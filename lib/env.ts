export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;

export const { NEXT_PUBLIC_GOOGLE_TRACKING_ID, NEXT_PUBLIC_GOOGLE_ADSENSE_URL, NEXT_PUBLIC_CONTACT_EMAIL } = process.env as Record<string, string>;
