import { Heading, Text, VStack } from "@chakra-ui/react";

export default function FeedPage() {
  return (
    <VStack gap="4" p="8">
      <Heading as="h1" size="2xl">
        フィード
      </Heading>
      <Text color="fg.muted">投稿はまだありません。</Text>
    </VStack>
  );
}
