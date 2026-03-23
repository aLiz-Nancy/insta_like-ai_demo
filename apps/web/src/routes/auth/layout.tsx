import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { userContext } from "@/context";
import { authMiddleware } from "@/lib/auth.middleware";

export const middleware = [authMiddleware];

export function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (user) {
    throw redirect("/feed");
  }
}

export default function AuthLayout() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="sm" py="12">
        <VStack gap="8">
          <Heading as="h1" size="3xl" textAlign="center">
            My Portal
          </Heading>
          <Box w="full">
            <Outlet />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
