"use client";
import { UserInfo } from "@/components/auth/UserInfo";
import { useCurrentUser } from "@/hooks/user-current-user";

const Server = () => {
  const user = useCurrentUser();

  return (
    <>
      <UserInfo user={user} label="Client Component" />
    </>
  );
};

export default Server;
