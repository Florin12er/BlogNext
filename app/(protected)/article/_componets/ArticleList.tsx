"use client";
import { getArticles } from "@/actions/article";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { stripHtml } from "@/lib/getHtml";

import Link from "next/link";

export default async function ArticleList({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const { articles, totalPages, currentPage } = await getArticles(
    page,
    10,
    search,
  );

  if (!articles || articles.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No articles found.</p>;
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {article.title}
            </CardTitle>
            <p className="text-sm text-gray-500">
              By {article.author.name} •{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {stripHtml(article.content).substring(0, 200)}...
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex space-x-2">
              {article.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <Link href={`/article/${article.id}`}>
              <Button variant="outline">Read More</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/article?page=${pageNum}${search ? `&search=${search}` : ""}`}
                  className={
                    pageNum === currentPage
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
