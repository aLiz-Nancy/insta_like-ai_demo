import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export function createSupabaseServerClient(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables",
    );
  }

  const headers = new Headers();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").filter(
          (cookie): cookie is { name: string; value: string } =>
            cookie.value != null,
        );
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          headers.append("Set-Cookie", serializeCookie(name, value, options));
        }
      },
    },
  });

  return { supabase, headers };
}

function serializeCookie(
  name: string,
  value: string,
  options?: Record<string, unknown>,
): string {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (options) {
    if (options.path) cookie += `; Path=${options.path}`;
    if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
    if (options.domain) cookie += `; Domain=${options.domain}`;
  }
  cookie += options?.httpOnly !== false ? "; HttpOnly" : "";
  cookie += options?.secure !== false ? "; Secure" : "";
  cookie += `; SameSite=${options?.sameSite ?? "Lax"}`;
  return cookie;
}
