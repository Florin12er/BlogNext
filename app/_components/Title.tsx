import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface TitleProps {
  title: string;
  className?: string;
  size?: "small" | "medium" | "large";
  underline?: boolean;
  color?: "primary" | "secondary" | "accent" | "white";
}

export const Title = ({
  title,
  className,
  size = "medium",
  underline = false,
  color = "primary",
}: TitleProps) => {
  const sizeClasses = {
    small: "text-xl md:text-2xl",
    medium: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl lg:text-5xl",
  };

  const colorClasses = {
    primary: "text-gray-800 dark:text-gray-100",
    secondary: "text-gray-600 dark:text-gray-300",
    accent: "text-blue-600 dark:text-blue-400",
    white: "text-white dark:text-black",
  };

  return (
    <h1
      className={cn(
        "font-bold leading-tight tracking-tight mb-4",
        poppins.className,
        sizeClasses[size],
        colorClasses[color],
        underline && "border-b-2 pb-2",
        underline &&
          color === "primary" &&
          "border-gray-300 dark:border-gray-700",
        underline &&
          color === "secondary" &&
          "border-gray-200 dark:border-gray-800",
        underline &&
          color === "accent" &&
          "border-blue-300 dark:border-blue-700",
        underline &&
          color === "white" &&
          "border-gray-300 dark:border-gray-700",
        className,
      )}
    >
      {title}
    </h1>
  );
};
