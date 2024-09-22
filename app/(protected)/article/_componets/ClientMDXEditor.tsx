"use client";

import { useEffect, useState } from "react";
import {
  MDXEditor,
  MDXEditorMethods,
  imagePlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  UndoRedo,
  toolbarPlugin,
  linkPlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface ClientSideMDXEditorProps {
  content: string;
  editorRef: React.RefObject<MDXEditorMethods>;
}

const ClientSideMDXEditor: React.FC<ClientSideMDXEditorProps> = ({
  content,
  editorRef,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <MDXEditor
      ref={editorRef}
      markdown={content}
      readOnly={true}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin(),
        tablePlugin(),
        linkPlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "js",
        }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            go: "Go",
            css: "CSS",
            html: "HTML",
            python: "Python",
            rust: "Rust",
            tsx: "TypeScript React",
            jsx: "React",
          },
          codeMirrorExtensions: [vscodeDark],
        }),
        toolbarPlugin({ toolbarContents: () => <UndoRedo /> }),
      ]}
      contentEditableClassName="outline-none flex-grow overflow-y-auto max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-['']"
    />
  );
};

export default ClientSideMDXEditor;
