import { NavBar } from "../_componets/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-500 to-violet-800">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default ProtectedLayout;
