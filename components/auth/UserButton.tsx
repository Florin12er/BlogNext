"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/user-current-user";
import { LogoutButton } from "./LogoutButton";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-500 to-violet-800">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <LogoutButton>
            <DropdownMenuItem className="flex justify-between cursor-pointer">
              Logout
              <ExitIcon />
            </DropdownMenuItem>
          </LogoutButton>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
