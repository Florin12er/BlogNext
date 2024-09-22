"use client";

import { useEffect, useState } from "react";
import { getUserArticles } from "@/actions/article";
import { useToast } from "@/hooks/use-toast";
import ArticleCard from "./_componets/ArticleCard";
import ArticlePagination from "./_componets/ArticlePagination";
import { Card } from "@/components/ui/card";
import { BookOpenIcon } from "lucide-react";
import { Spinner } from "@/components/Spinner";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: { id: string; name: string }[];
}

export default function UserArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getUserArticles(currentPage, 6);
      if ("error" in result) {
        setError(result.error as string);
      } else {
        setArticles(result.articles);
        setTotalPages(result.totalPages);
      }
    } catch (err) {
      setError("Failed to fetch articles");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Card className="p-8 text-center bg-gray-50">
        <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          You haven't written any articles yet.
        </p>
        <p className="text-gray-500 mt-2">
          Start writing and share your thoughts with the world!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6 text-center">
        Your Articles
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ml-2">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={fetchArticles}
            showToast={(title, description, variant) =>
              toast({ title, description, variant })
            }
          />
        ))}
      </div>
      <ArticlePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
