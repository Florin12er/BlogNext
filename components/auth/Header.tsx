import { Title } from "@/app/_components/Title";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <Title className="text-3xl font-semibold" title="Bloggy" />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
