import { redirect } from "react-router";
import type { Route } from "./+types/callback";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    throw redirect("/auth/login");
  }

  const { supabase, headers } = createSupabaseServerClient(request);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw redirect("/auth/login");
  }

  return redirect("/feed", { headers });
}
