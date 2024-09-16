import { LoginButton } from "../auth/LoginButton";
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <div className="w-full text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to Bloggy
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Share your ideas, stories, and knowledge with the world. Join our
            community of writers and readers today.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <LoginButton mode="redirect" asChild>
                <Button variant="default" size="lg">
                  Start Reading
                </Button>
              </LoginButton>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
