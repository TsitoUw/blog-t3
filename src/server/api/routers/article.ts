import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import slugify from "slugify";

export const writeFormSchema = z.object({
  title: z.string().min(20),
  description: z.string().min(60),
  text: z.string().min(100).optional(),
  html: z.string().min(100),
});

export const findBySlugSchema = z.object({
  slug: z.string().min(1),
});

export const articleRouter = createTRPCRouter({
  createArticle: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({
        ctx: { db, session },
        input: { description, html, title, text },
      }) => {
        return await db.article.create({
          data: {
            title,
            description,
            text,
            html,
            slug: slugify(title, {
              remove: /[!@#$%^&*]/g,
            }),
            author: {
              connect: {
                id: session.userId,
              },
            },
          },
        });
      },
    ),

  bookmarkArticle: protectedProcedure
    .input(z.object({ articleId: z.string().min(1) }))
    .mutation(
      async ({
        ctx: {
          db,
          session: { userId },
        },
        input: { articleId },
      }) => {
        return await db.bookmark.create({
          data: {
            userId,
            articleId,
          },
        });
      },
    ),
  removeArticleBookmark: protectedProcedure
    .input(z.object({ articleId: z.string().min(1) }))
    .mutation(
      async ({
        ctx: {
          db,
          session: { userId },
        },
        input: { articleId },
      }) => {
        return await db.bookmark.delete({
          where: {
            userId_articleId: {
              userId,
              articleId,
            },
          },
        });
      },
    ),
  getReadingList: protectedProcedure.query(
    async ({
      ctx: {
        db,
        session: { userId },
      },
    }) => {
      return await db.bookmark.findMany({
        where: {
          userId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          article: {
            include: {
              author: {
                select: { name: true, image: true },
              },
            },
          },
        },
      });
    },
  ),
  getArticle: publicProcedure
    .input(findBySlugSchema)
    .query(async ({ ctx: { db }, input: { slug } }) => {
      return await db.article.findFirst({
        where: { slug: { equals: slug } },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  getArticles: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db.article.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        createdAt: true,
        featuredImage: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      // TODO: change later, just for mocking the home page
      take: 20,
      orderBy: { createdAt: "desc" },
    });
  }),
});
