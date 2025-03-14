import Articles from "@/components/article/articles";
import Menu from "@/components/home/menu";
import { api } from "@/trpc/server";
import { Typography } from "@mui/material";

export default async function Home() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // void (await api.post.hello({ text: "from tRPC" }));

  // void api.post.getLatest.prefetch();

  const articles = await api.article.getArticles();

  return (
    <div className="container mx-auto grid grid-cols-12">
      <main className="col-span-12 min-h-[calc(100vh-64px-2px)] p-4 lg:col-span-8 lg:border-r">
        <Menu />
        <Articles articles={articles} />
      </main>
      <div className="col-span-4 hidden p-4 px-8 lg:block">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reading list
        </Typography>
        <Articles articles={articles} small />

      </div>
    </div>
  );
}
