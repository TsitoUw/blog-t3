import Articles from "@/components/article/articles";
import Menu from "@/components/home/menu";
import { Typography } from "@mui/material";

export default async function Home() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // void (await api.post.hello({ text: "from tRPC" }));

  // void api.post.getLatest.prefetch();

  return (
    <div className="container mx-auto grid grid-cols-12">
      <main className="col-span-8 min-h-[calc(100vh-64px-2px)] border-r p-4">
        <Menu />
        <Articles />
      </main>
      <div className="col-span-4 p-4">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reading list
        </Typography>
      </div>
    </div>
  );
}
