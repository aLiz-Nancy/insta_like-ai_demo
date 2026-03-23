import type { MiddlewareFunction } from "react-router";
import { userContext } from "../context";
import { createSupabaseServerClient } from "./supabase/server";

export const authMiddleware: MiddlewareFunction<Response> = async (
  { request, context },
  next,
) => {
  const { supabase, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  context.set(userContext, user ?? null);

  const response = await next();

  // Merge Set-Cookie headers from Supabase (e.g. token refresh)
  for (const value of headers.getSetCookie()) {
    response.headers.append("Set-Cookie", value);
  }

  return response;
};
