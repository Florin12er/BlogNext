import { NavBar } from "../article/_componets/NavBar";
interface ArticleLayoutProps {
  children: React.ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps) => {
  return (
    <>
      <div className="h-full w-full">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default ArticleLayout;
