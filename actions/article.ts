"use server";

import * as z from "zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { ArticleSchema } from "@/schemas";

export const createArticle = async (values: z.infer<typeof ArticleSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  try {
    const validatedData = ArticleSchema.parse(values);

    const article = await db.article.create({
      data: {
        ...validatedData,
        authorId: dbUser.id,
      },
    });

    revalidatePath("/articles");
    return { success: "Article created successfully!", article };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to create article." };
  }
};

export const updateArticle = async (
  id: string,
  values: z.infer<typeof ArticleSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const article = await db.article.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!article || article.authorId !== user.id) {
    return { error: "Unauthorized or article not found!" };
  }

  try {
    const validatedData = ArticleSchema.parse(values);

    const updatedArticle = await db.article.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath(`/articles/${id}`);
    return {
      success: "Article updated successfully!",
      article: updatedArticle,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to update article." };
  }
};

export const deleteArticle = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const article = await db.article.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!article || article.authorId !== user.id) {
    return { error: "Unauthorized or article not found!" };
  }

  try {
    await db.article.delete({
      where: { id },
    });

    revalidatePath("/articles");
    return { success: "Article deleted successfully!" };
  } catch (error) {
    return { error: "Failed to delete article." };
  }
};

export const getArticle = async (id: string) => {
  try {
    const article = await db.article.findUnique({
      where: { id },
      include: { author: true, tags: true },
    });

    if (!article) {
      return { error: "Article not found." };
    }

    return { article };
  } catch (error) {
    return { error: "Failed to fetch article." };
  }
};
export const getArticles = async (page = 1, limit = 10, search?: string) => {
  try {
    const skip = (page - 1) * limit;

    let whereCondition: Prisma.ArticleWhereInput = {};

    if (search) {
      whereCondition = {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const articles = await db.article.findMany({
      where: whereCondition,
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: { author: true, tags: true },
    });

    const totalArticles = await db.article.count({ where: whereCondition });

    return {
      articles: articles.map((article) => ({
        ...article,
        createdAt: article.createdAt.toISOString(),
      })),
      totalPages: Math.ceil(totalArticles / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { error: "Failed to fetch articles." };
  }
};
