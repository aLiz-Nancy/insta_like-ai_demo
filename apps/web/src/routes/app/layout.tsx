import { Box } from "@chakra-ui/react";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { userContext } from "@/context";
import { authMiddleware } from "@/lib/auth.middleware";

export const middleware = [authMiddleware];

export function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (!user) {
    throw redirect("/auth/login");
  }
}

export default function AppLayout() {
  return (
    <Box minH="100vh">
      <Outlet />
    </Box>
  );
}
