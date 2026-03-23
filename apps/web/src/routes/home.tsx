import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { greet } from "@repo/shared-sandbox/greet";
import { SandboxCard } from "@repo/shared-sandbox/ui/sandbox-card/index";

export function meta() {
  return [
    { title: "My Portal" },
    { name: "description", content: "My Portal App" },
  ];
}

export default function Home() {
  const message = greet({ name: "Portal" });

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap="6" p="6">
        <Heading size="2xl">{message}</Heading>
        <Text color="fg.muted">Chakra UI v3 is working correctly.</Text>
        <Button colorPalette="blue" size="lg">
          Get Started
        </Button>
        <SandboxCard
          title="Sandbox"
          description="This page renders the shared sandbox slice for verification."
        />
      </VStack>
    </Box>
  );
}
