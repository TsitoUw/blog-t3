import UserAvatar from "@/components/user/avatar";
import { api } from "@/trpc/server";
import { Box, Button, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { notFound } from "next/navigation";
import React from "react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Markup } from "interweave";
import { polyfill } from "interweave-ssr";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

// ssr for interweave
polyfill();

dayjs.extend(relativeTime);

async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await api.article.getArticle({ slug });

  // explicitly redirecting to not found
  if (!article) return notFound();

  return (
    <main className="container mx-auto mb-4 max-w-5xl py-4 px-4 lg:px-0">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          my: 4,
          textTransform: "capitalize",
          fontWeight: "bold",
          letterSpacing: "-0.05em",
          textWrap: "pretty",
          wordBreak: "break-word",
        }}
      >
        {article.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <UserAvatar
          name={article.author.name}
          image={article.author.image}
          size={44}
        />
        <Box className="flex flex-col justify-center gap-y-1">
          <Typography component="p">{article.author.name}</Typography>
          <Typography component="p" variant="caption">
            {dayjs(article.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box className="my-4 flex items-center justify-between border-y py-2">
        <Box className="space-x-2">
          <Button
            color="error"
            variant="outlined"
            className="flex items-center gap-1"
          >
            <FavoriteBorderOutlinedIcon />
            <Typography component="p" variant="caption">
              99
            </Typography>
          </Button>
          <Button variant="outlined" className="flex items-center gap-1">
            <ChatBubbleOutlineOutlinedIcon />
            <Typography component="p" variant="caption">
              102
            </Typography>
          </Button>
        </Box>
        <IconButton>
          <BookmarkAddOutlinedIcon />
        </IconButton>
      </Box>
      <Box className="content | my-4 space-y-6">
        {article.featuredImage && (
          <Image
            alt={article.title}
            src={article.featuredImage}
            width={1024}
            height={680}
            className="!h-auto max-h-96 !w-full !object-cover"
            priority
          />
        )}

        <Box className="border-l-4 border-l-slate-800 py-2 pl-2">
          <Typography component="p" variant="subtitle2">
            {article.description}
          </Typography>
        </Box>

        <Box className="prose">
          <Markup content={article.html ?? article.text} />
        </Box>
      </Box>
    </main>
  );
}

export default ArticlePage;
