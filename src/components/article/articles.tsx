import React from "react";
import type { SelectedArticle } from "./article";
import Article from "./article";

type Props = {
  articles: SelectedArticle[];
  small?: boolean;
};

function Articles({ articles, small }: Props) {
  return (
    <div className={`py-4 ${!small && "lg:px-16"}`}>
      {articles.length < 1 && (
        <p className="text-center">Yay! You have seen it all.</p>
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
