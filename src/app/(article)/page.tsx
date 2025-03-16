import Articles from "@/components/article/articles";
import Menu from "@/components/home/menu";
import { auth } from "@/lib/auth";
import { api } from "@/trpc/server";
import { Typography } from "@mui/material";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log({ session });

  const articles = await api.article.getArticles();

  try {
    const data = session && (await api.article.getReadingList());
    console.log({ data });
  } catch (error) {
    console.error(error);
  }

  // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  // const readingList = data ? data.map((d) => d.article) : [];

  return (
    <div className="container mx-auto grid grid-cols-12">
      <main className="col-span-12 min-h-[calc(100vh-64px-2px)] p-4 lg:col-span-8 lg:border-r">
        <Menu />
        <Articles articles={articles} />
      </main>
      <div className="col-span-4 hidden p-4 px-8 lg:block">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reading List
        </Typography>
        <Articles
          articles={[]}
          small
          emptyListText="Bookmarked articles will appear here."
        />
      </div>
    </div>
  );
}
