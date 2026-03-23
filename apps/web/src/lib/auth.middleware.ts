import type { MiddlewareFunction } from "react-router";
import { userContext } from "../context";
import { createSupabaseServerClient } from "./supabase/server";

export const authMiddleware: MiddlewareFunction<Response> = async ({
  request,
  context,
}) => {
  const { supabase } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  context.set(userContext, user ?? null);
};
