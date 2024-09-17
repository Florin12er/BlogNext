import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import ArticleList from "./_componets/ArticleList";

export default function ArticlesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Articles</h1>
        <Link href="/article/new">
          <Button className="flex items-center space-x-2">
            <PlusIcon size={20} />
            <span>Create New Article</span>
          </Button>
        </Link>
      </div>
      <div className="mb-8">
        <form className="flex space-x-2" action="/article" method="GET">
          <Input
            type="text"
            name="search"
            placeholder="Search articles..."
            defaultValue={search}
            className="flex-grow"
          />
          <Button type="submit" variant="outline">
            <SearchIcon size={20} />
          </Button>
        </form>
      </div>
      <Suspense
        fallback={<div className="text-center mt-8">Loading articles...</div>}
      >
        <ArticleList page={page} search={search} />
      </Suspense>
    </div>
  );
}
