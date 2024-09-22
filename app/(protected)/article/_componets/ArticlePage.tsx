// app/(protected)/article/_components/ArticlePage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, TagIcon } from "lucide-react";
import TableOfContents from "./TableOfContent";
import { Spinner } from "@/components/Spinner";

const ClientSideMDXEditor = dynamic(
  () => import("../_componets/ClientMDXEditor"),
  { ssr: false },
);

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
}

interface ScrollableArticleProps {
  article: Article;
}

interface TocItem {
  level: number;
  text: string;
  id: string;
}

export const ArticlePage: React.FC<ScrollableArticleProps> = ({ article }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    const generateToc = (content: string) => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const tocItems: TocItem[] = [];
      let match;
      let index = 0;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim().replace(/&#x20;/g, " ");
        const id = `heading-${index++}`;
        tocItems.push({ level, text, id });
      }

      setToc(tocItems);
    };

    generateToc(article.content);
  }, [article.content]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-100px 0px -66%",
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-8">
            <TableOfContents toc={toc} activeId={activeId} />
          </div>
        </aside>

        <main className="mt-8 lg:mt-0 lg:col-span-3">
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-gray-900">
                {article.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
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
          </Card>

          <Card className="shadow-lg">
            <CardContent className="prose prose-lg max-w-none pt-6">
              <ClientSideMDXEditor
                content={article.content}
                editorRef={editorRef}
              />
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                <TagIcon size={14} className="mr-1 inline" />
                {tag.name}
              </Badge>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticlePage;
