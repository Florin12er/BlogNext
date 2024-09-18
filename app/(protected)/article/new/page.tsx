"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { createArticle } from "@/actions/article";
import { Editor } from "../_componets/Editor";

const NewArticle = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createArticle({ title, content, published });
      if (result.error) {
        console.error(result.error);
      } else {
        router.push(`/article/${result.article?.id}`);
      }
    } catch (error) {
      console.error("Failed to create article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
        </div>
        <Editor content={content} setContent={setContent} />
        <div className="flex items-center">
          <Checkbox
            id="published"
            checked={published}
            onCheckedChange={(checked) => setPublished(checked as boolean)}
          />
          <label
            htmlFor="published"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Publish immediately
          </label>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Article"}
        </Button>
      </form>
    </div>
  );
};

export default NewArticle;
