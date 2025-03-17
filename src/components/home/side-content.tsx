"use client";

import { api } from "@/trpc/react";
import { Typography } from "@mui/material";
import type { Session } from "better-auth";
import React from "react";
import Articles from "../article/articles";

type Props = {
  session?: Session | null;
};

function SideContent({ session }: Props) {
  const { data, isLoading } = session
    ? api.article.getReadingList.useQuery()
    : { data: [], isLoading: false };
  const readingList = data ? data.flatMap((d) => d.article) : [];
  return (
    <div className="col-span-4 hidden p-4 px-8 lg:block">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Reading List
      </Typography>
      <Articles
        articles={readingList}
        small
        emptyListText="Bookmarked articles will appear here."
        isLoading={isLoading}
      />
    </div>
  );
}

export default SideContent;
