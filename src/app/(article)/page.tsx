import MainContent from "@/components/home/main-content";
import SideContent from "@/components/home/side-content";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="container mx-auto grid grid-cols-12">
      <MainContent />
      <SideContent session={session?.session} />
    </div>
  );
}
