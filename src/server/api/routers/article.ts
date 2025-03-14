import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import slugify from "slugify";

export const writeFormSchema = z.object({
  title: z.string().min(20),
  description: z.string().min(60),
  text: z.string().min(100).optional(),
  html: z.string().min(100),
});

export const articleRouter = createTRPCRouter({
  createArticle: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({
        ctx: { db, session },
        input: { description, html, title, text },
      }) => {
        await db.article.create({
          data: {
            title,
            description,
            text,
            html,
            slug: slugify(title),
            author: {
              connect: {
                id: session.userId,
              },
            },
          },
        });
      },
    ),
  getArticle: publicProcedure.query(async ({ ctx: { db } }) => {
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
