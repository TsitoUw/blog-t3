import { Box, IconButton, Typography } from "@mui/material";
import type { Article } from "@prisma/client";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Link from "next/link";
import UserAvatar from "../user/avatar";

type SelectedUser = {
  author: { name: string; image: string | null };
};

export type SelectedArticle = Pick<
  Article,
  "id" | "title" | "slug" | "featuredImage" | "description" | "createdAt"
> &
  SelectedUser;

type Props = {
  article: SelectedArticle;
  noImage?: boolean;
  noDescription?: boolean;
};

function Article({ article, noImage, noDescription }: Props) {
  return (
    <Link href={`/${article.slug}`}>
      <div className={`cursor-pointer border-b ${!noDescription?"py-4":"py-2"}`}>
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
          <Box sx={{ flex: "1 1 auto", wordBreak: "break-word" }}>
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
              <IconButton size="small">
                <BookmarkAddOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
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
    </Link>
  );
}

export default Article;
