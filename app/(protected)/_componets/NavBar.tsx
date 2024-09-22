"use client";

import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
        <div className="flex gap-x-2">
          <Button variant={pathname === "/" ? "default" : "outline"}>
            <Link href="/article">Home</Link>
          </Button>
          <Button variant={pathname === "/article" ? "default" : "outline"}>
            <Link href="/user/articles">Your Articles</Link>
          </Button>
          <Button
            variant={pathname === "/settings" ? "default" : "outline"}
            asChild
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
        <UserButton />
      </nav>
    </>
  );
};
