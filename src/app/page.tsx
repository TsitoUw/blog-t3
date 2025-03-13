import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import ThemeToggle from "./_components/theme-toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  void (await api.post.hello({ text: "from tRPC" }));

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Hello {session?.user.name}</p>
        <ThemeToggle />
        <LatestPost />
      </main>
    </HydrateClient>
  );
}
