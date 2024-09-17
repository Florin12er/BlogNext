"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@/components/auth/UserButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/article?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/article" className="flex-shrink-0">
              <span className="text-2xl font-bold text-purple-600">Bloggy</span>
            </Link>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="mr-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-md"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <Link href="/article/new">
              <Button variant="outline" className="mr-4">
                <PlusIcon className="mr-2 h-4 w-4" /> New Article
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
