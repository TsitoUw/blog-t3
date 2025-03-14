import { Avatar, Box, IconButton, Typography } from "@mui/material";
import type { Article } from "@prisma/client";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

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

const stringAvatar = (str: string) => {
  if (!str) return "";

  if (str.length < 2) return str[1];
  const [first, second] = str.split(" ");

  return first ?? "" + second ?? "";
};

function Article({ article, noImage, noDescription }: Props) {
  return (
    <div className="border-b py-4">
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
        {article.author.image ? (
          <Avatar
            alt={article.author.name}
            src={article.author.image}
            sx={{ borderRadius: "8px", width: 24, height: 24 }}
          />
        ) : (
          <Avatar sx={{ borderRadius: "8px", width: 24, height: 24 }}>
            {stringAvatar(article.author.name)}
          </Avatar>
        )}
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
          <Box sx={{ ml: "56px" }}>
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
