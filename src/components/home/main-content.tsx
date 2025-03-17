"use client";
import { api } from "@/trpc/react";
import React from "react";
import Menu from "./menu";
import Articles from "../article/articles";

function MainContent() {
  const { data: articles, isLoading } = api.article.getArticles.useQuery();

  return (
    <main className="col-span-12 min-h-[calc(100vh-64px-2px)] p-4 lg:col-span-8 lg:border-r">
      <Menu />
      <Articles articles={articles ?? []} isLoading={isLoading} />
    </main>
  );
}

export default MainContent;
