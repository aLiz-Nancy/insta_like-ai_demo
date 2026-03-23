import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home, { meta } from "./home";

vi.mock("@repo/shared-sandbox/greet", () => ({
  greet: () => "Hello, Portal!",
}));

vi.mock("@repo/shared-sandbox/ui/sandbox-card/index", () => ({
  SandboxCard: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div data-testid="sandbox-card">
      {title} - {description}
    </div>
  ),
}));

describe("meta", () => {
  it("returns title and description", () => {
    const result = meta();
    expect(result).toEqual([
      { title: "My Portal" },
      { name: "description", content: "My Portal App" },
    ]);
  });
});

describe("Home", () => {
  it("renders greeting message and SandboxCard", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Home />
      </ChakraProvider>,
    );
    expect(screen.getByText("Hello, Portal!")).toBeDefined();
    expect(screen.getByTestId("sandbox-card")).toBeDefined();
  });
});
