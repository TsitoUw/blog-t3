import React from "react";
import type { SelectedArticle } from "./article";
import Article from "./article";

type Props = {
  articles: SelectedArticle[];
  small?: boolean;
  emptyListText?: string;
};

function Articles({ articles, small, emptyListText }: Props) {
  return (
    <div className={`space-y-4 py-4 ${!small && "lg:px-16"}`}>
      {articles.length < 1 && (
        <p className={`text-center ${small && "text-sm"}`}>
          {emptyListText ?? "Yay! You have seen it all."}
        </p>
      )}
      {articles.map((article) => (
        <Article
          article={article}
          key={article.id}
          noImage={small}
          noDescription={small}
        />
      ))}
    </div>
  );
}

export default Articles;
