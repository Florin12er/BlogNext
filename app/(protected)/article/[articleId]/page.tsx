// app/article/[articleId]/page.tsx
import { getArticle } from "@/actions/article";
import { notFound } from "next/navigation";
import { ArticlePage as ScrollableArticle } from "../_componets/ArticlePage";

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const { article, error } = await getArticle(params.articleId);

  if (error || !article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ScrollableArticle article={article as any} />
    </div>
  );
}
