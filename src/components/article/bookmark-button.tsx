"use client";
import React, { useState } from "react";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { IconButton } from "@mui/material";
import { api } from "@/trpc/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Props = {
  articleId: string;
  bookmarked: boolean;
};

function BookmarkButton({ articleId, bookmarked }: Props) {
  const { data: session } = authClient.useSession();
  const postRoute = api.useUtils().article;
  const utils = api.useUtils();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  function invalidate() {
    utils.article.invalidate().catch((e) => console.error(e));

    postRoute.getReadingList.invalidate().catch((e) => console.error(e));
    postRoute.getArticles.invalidate().catch((e) => console.error(e));
  }

  const bookmarkPost = api.article.bookmarkArticle.useMutation({
    onSuccess: () => {
      setIsBookmarked(true);
      invalidate();
    },
  });

  const removeBookmarkArticle = api.article.removeArticleBookmark.useMutation({
    onSuccess: () => {
      setIsBookmarked(false);
      invalidate();
    },
  });

  async function toggleBookmark() {
    if(!session){
      toast.info("Please sign in to save this article to your bookmarks.")
      return;
    }
    try {
      if (!isBookmarked) {
        await bookmarkPost.mutateAsync({
          articleId,
        });
      } else {
        await removeBookmarkArticle.mutateAsync({
          articleId,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <IconButton size="small" onClick={() => toggleBookmark()}>
      {isBookmarked ? <BookmarkAddIcon /> : <BookmarkAddOutlinedIcon />}
    </IconButton>
  );
}

export default BookmarkButton;
