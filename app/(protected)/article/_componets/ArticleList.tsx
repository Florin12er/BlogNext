"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { CalendarIcon, UserIcon, TagIcon } from "lucide-react";
import { stripHtml } from "@/lib/getHtml";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
}

interface ArticleListProps {
  articles: Article[];
  totalPages: number;
  currentPage: number;
  search?: string;
}

export default function ArticleList({
  articles,
  totalPages,
  currentPage,
  search,
}: ArticleListProps) {
  const [strippedContents, setStrippedContents] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const stripped: { [key: string]: string } = {};
    articles.forEach((article) => {
      stripped[article.id] =
        stripHtml(article.content).substring(0, 200) + "...";
    });
    setStrippedContents(stripped);
  }, [articles]);

  if (!articles || articles.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500 text-lg">No articles found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary overflow-hidden"
        >
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-bold">
              <Link
                href={`/article/${article.id}`}
                className="hover:text-primary transition-colors duration-300"
              >
                {article.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
              <div className="flex items-center">
                <UserIcon size={16} className="mr-1" />
                {article.author.name}
              </div>
              <div className="flex items-center">
                <CalendarIcon size={16} className="mr-1" />
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 leading-relaxed">
              {strippedContents[article.id]}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between items-center gap-4 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  <TagIcon size={12} className="mr-1" />
                  {tag.name}
                </span>
              ))}
            </div>
            <Link href={`/article/${article.id}`}>
              <Button
                variant="outline"
                className="hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/article?page=${Math.max(1, currentPage - 1)}${search ? `&search=${search}` : ""}`}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/article?page=${pageNum}${search ? `&search=${search}` : ""}`}
                  className={`${
                    pageNum === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } px-4 py-2 rounded-md transition-colors duration-300`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={`/article?page=${Math.min(totalPages, currentPage + 1)}${search ? `&search=${search}` : ""}`}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
