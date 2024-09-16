import { CardWrapper } from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <>
      <CardWrapper
        headerLabel="Something went wrong"
        backButtonLabel="Go back"
        backButtonHref="/auth/login"
      >
        <div className="w-full flex items-center justify-center">
          <ExclamationTriangleIcon className="text-destructive" />
        </div>
      </CardWrapper>
    </>
  );
};
