import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  InsertTable,
  BlockTypeSelect,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  ListsToggle,
  thematicBreakPlugin,
  frontmatterPlugin,
  StrikeThroughSupSubToggles,
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
  linkDialogPlugin,
  InsertThematicBreak,
  InsertFrontmatter,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
interface EditorProps {
  content: string;
  setContent: (value: string) => void;
}

export const Editor = ({ content, setContent }: EditorProps) => {
  return (
    <MDXEditor
      markdown={content}
      onChange={(value) => setContent(value)}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
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
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex gap-1">
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <StrikeThroughSupSubToggles />
              <ListsToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
              <BlockTypeSelect />
              <InsertFrontmatter />
              <InsertCodeBlock />
            </div>
          ),
        }),
        linkPlugin(),
        thematicBreakPlugin(),
        imagePlugin(),
        tablePlugin(),
        linkDialogPlugin(),
        frontmatterPlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
      ]}
      contentEditableClassName="dark-editor dark-theme outline-none flex-grow overflow-y-auto max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      className="border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
    />
  );
};
