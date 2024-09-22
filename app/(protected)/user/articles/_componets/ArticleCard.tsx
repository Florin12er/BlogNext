import { useState, useEffect } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, PencilIcon, TagIcon, TrashIcon } from "lucide-react";
import { stripHtml } from "@/lib/getHtml";
import { deleteArticle } from "@/actions/article";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    author: {
      name: string;
    };
    content: string;
    createdAt: string;
    tags: { id: string; name: string }[];
  };
  onDelete: () => void;
  showToast: (
    title: string,
    description: string,
    variant?: "default" | "destructive",
  ) => void;
}

export default function ArticleCard({
  article,
  onDelete,
  showToast,
}: ArticleCardProps) {
  const [strippedContent, setStrippedContent] = useState("");

  useEffect(() => {
    setStrippedContent(stripHtml(article.content).substring(0, 150) + "...");
  }, [article.content]);

  const handleDeleteArticle = async () => {
    try {
      const result = await deleteArticle(article.id);
      if ("error" in result) {
        showToast("Error", result.error as string, "destructive");
      } else {
        showToast("Success", result.success);
        onDelete();
      }
    } catch (err) {
      showToast("Error", "Failed to delete article", "destructive");
    }
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary overflow-hidden">
      <CardHeader className="bg-gray-50 flex-grow">
        <CardTitle className="text-xl font-bold line-clamp-2">
          <Link
            href={`/article/${article.id}`}
            className="hover:text-primary transition-colors duration-300"
          >
            {article.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <CalendarIcon size={14} />
          {new Date(article.createdAt).toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {strippedContent}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between items-center gap-4 bg-gray-50 pt-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              <TagIcon size={10} className="mr-1" />
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/article/${article.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Read More...
            </Button>
          </Link>
          <Link href={`/user/articles/${article.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <PencilIcon size={16} />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                <TrashIcon size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your article.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteArticle}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
