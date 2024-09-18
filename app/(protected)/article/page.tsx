import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import { getArticles } from "@/actions/article";
import ArticleList from "./_componets/ArticleList";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const { articles, totalPages, currentPage } = await getArticles(
    page,
    10,
    search,
  );

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Articles</h1>
        <Link href="/article/new">
          <Button className="flex items-center space-x-2 bg-primary hover:bg-primary-dark transition-colors duration-300">
            <PlusIcon size={20} />
            <span>Create New Article</span>
          </Button>
        </Link>
      </div>
      <div className="mb-12">
        <form className="flex space-x-2" action="/article" method="GET">
          <Input
            type="text"
            name="search"
            placeholder="Search articles..."
            defaultValue={search}
            className="flex-grow focus:ring-2 focus:ring-primary"
          />
          <Button
            type="submit"
            variant="outline"
            className="hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <SearchIcon size={20} />
          </Button>
        </form>
      </div>
      <Suspense
        fallback={
          <div className="text-center mt-8 text-lg">Loading articles...</div>
        }
      >
        <ArticleList
          articles={articles as any}
          totalPages={totalPages || 1}
          currentPage={currentPage || 1}
          search={search}
        />
      </Suspense>
    </div>
  );
}
