"use client";

import { Editor } from "@/app/(protected)/article/_componets/Editor";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { useToast } from "@/hooks/use-toast";
import { updateArticle, getUserArticle } from "@/actions/article";
import { notFound, useParams, useRouter } from "next/navigation";

interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  tagIds?: string[];
}

const EditArticle = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const articleId = params.id as string;

  useEffect(() => {
    const fetchArticle = async () => {
      if (articleId) {
        try {
          const result = await getUserArticle(articleId);
          if (result.article) {
            setArticle(result.article as Article);
          } else {
            setError(result.error || "Failed to fetch article");
          }
        } catch (err) {
          setError("An error occurred while fetching the article");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    setIsLoading(true);
    try {
      const result = await updateArticle(articleId, {
        title: article.title,
        content: article.content,
        published: article.published,
        tagIds: article.tagIds,
      });
      if (result.success) {
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
        router.push(`/article/${articleId}`);
      } else {
        setError(result.error || "Failed to update article");
        toast({
          title: "Error",
          description: result.error || "Failed to update article",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An error occurred while updating the article");
      toast({
        title: "Error",
        description: "An error occurred while updating the article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );
  if (error) return notFound();
  if (!article) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
          placeholder="Article Title"
          className="w-full mb-4 p-2 border rounded"
        />
        <Editor
          content={article.content}
          setContent={(content) => setArticle({ ...article, content })}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
