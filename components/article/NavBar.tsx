import Link from "next/link";
import { LoginButton } from "../auth/LoginButton";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              MediumClone
            </Link>
          </div>
          <div className="flex items-center">
            <LoginButton mode="redirect" asChild>
              <Button variant="default" className="ml-4">
                Sign Up
              </Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </nav>
  );
};
