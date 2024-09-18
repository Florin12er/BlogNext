import React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TocItem {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  toc: TocItem[];
  activeId: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc, activeId }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <nav>
            <ul className="space-y-1">
              {toc.map((heading) => (
                <li
                  key={heading.id}
                  className={`${heading.level === 1 ? "mt-2" : "ml-" + (heading.level - 1) * 4}`}
                >
                  <Link
                    href={`#${heading.id}`}
                    className={`block py-1 px-2 rounded-md text-sm transition-colors duration-200 ${
                      activeId === heading.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {heading.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
