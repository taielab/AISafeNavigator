import createMiddleware from "next-intl/middleware";

import { locales } from "../i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: "en",
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: "as-needed",

  // Configure default locale detection
  localeDetection: true
});
