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
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "24px",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "2rem", margin: 0 }}>{message}</h1>
      <SandboxCard
        title="Sandbox"
        description="This page renders the shared sandbox slice for verification."
      />
    </main>
  );
}
