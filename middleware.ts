import { type NextRequest } from "next/server";
import { locales } from "./i18n";
import intlMiddleware from "./middlewares/intlMiddleware";

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"]
}; 