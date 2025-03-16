import { Box, Typography } from "@mui/material";
import type { Article } from "@prisma/client";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import UserAvatar from "../user/avatar";
import BookmarkButton from "./bookmark-button";

type Additional = {
  author: { name: string; image: string | null };
  bookmark?: { userId: string; articleId: string }[];
};

export type SelectedArticle = Pick<
  Article,
  "id" | "title" | "slug" | "featuredImage" | "description" | "createdAt"
> &
  Additional;

type Props = {
  article: SelectedArticle;
  noImage?: boolean;
  noDescription?: boolean;
};

function Article({ article, noImage, noDescription }: Props) {
  return (
    <div className={`border-b ${!noDescription ? "py-4" : "py-2"}`}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
        <UserAvatar
          name={article.author.name}
          image={article.author.image}
          size={24}
        />
        <Typography variant="caption" component="p" sx={{ flexGrow: 1 }}>
          {article.author.name}
        </Typography>
      </Box>
      <div className="flex">
        <div className="flex-[1_1_auto]">
          <Link
            className="cursor-pointer break-words"
            href={`/${article.slug}`}
          >
            <Typography
              variant={!noDescription ? "h5" : "body1"}
              component={!noDescription ? "h5" : "p"}
              sx={{
                flexGrow: 1,
                textTransform: "capitalize",
                fontWeight: "bold",
                letterSpacing: "-0.05em",
                textWrap: "pretty",
                mb: !noDescription ? 2 : 0,
              }}
            >
              {article.title}
            </Typography>
            {!noDescription && (
              <Typography
                variant="caption"
                component="p"
                sx={{
                  flexGrow: 1,
                  textWrap: "pretty",
                  mb: 1,
                }}
              >
                {article.description}
              </Typography>
            )}
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="text-xs">
              ⭐ {dayjs(article.createdAt).format("MMM D, YYYY")}
            </p>
            <BookmarkButton
              articleId={article.id}
              bookmarked={!!article.bookmark?.length}
            />
          </Box>
        </div>
        {!noImage && (
          <Box className="hidden lg:block" sx={{ ml: "56px" }}>
            <Box
              sx={{
                width: "160px",
                height: "107px",
                backgroundColor: "lightgray",
              }}
            >
              {article.featuredImage && (
                <Image
                  alt={article.title}
                  width={160}
                  height={107}
                  src={article.featuredImage}
                  className="!h-[107px] !w-[160px] !object-cover !object-center"
                />
              )}
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Article;
