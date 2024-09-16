import { UserInfo } from "@/components/auth/UserInfo";
import { currentUser } from "@/lib/auth";

const Server = async () => {
  const user = await currentUser();

  return (
    <>
      <UserInfo user={user} label="Server Component" />
    </>
  );
};

export default Server;
