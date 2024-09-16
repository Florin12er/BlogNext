"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const role = useCurrentRole();
  const router = useRouter();

  if (role !== UserRole.ADMIN) {
    router.push("/auth/error");
  }

  return <div>Hero you can edit or add blogs</div>;
};
export default AdminPage;
