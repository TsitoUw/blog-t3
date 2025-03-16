"use client";

import Articles from "@/components/article/articles";
import Menu from "@/components/home/menu";
import { api } from "@/trpc/react";
import { Typography } from "@mui/material";

export default function Home() {
  // TODO: refactor to different component to better handle data and render

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const { data: session } = authClient.useSession();
  const { data: articles } = api.article.getArticles.useQuery();

  // const { data } = session
  //   ? api.article.getReadingList.useQuery()
  //   : { data: null };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  // const readingList = data ? data.map((d) => d.article) : [];

  return (
    <div className="container mx-auto grid grid-cols-12">
      <main className="col-span-12 min-h-[calc(100vh-64px-2px)] p-4 lg:col-span-8 lg:border-r">
        <Menu />
        <Articles articles={articles ?? []} />
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
