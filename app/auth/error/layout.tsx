const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-500 to-violet-800">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
