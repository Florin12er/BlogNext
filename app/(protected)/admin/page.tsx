"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";
import { toast } from "sonner";

const Admin = () => {
  const role = useCurrentRole();

  const onServerActionClick = () => {
    admin().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
      }
    });
  };

  const AdminApiRoute = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("You are allowed to use this api route");
      } else {
        toast.error("You are not allowed to use this api route");
      }
    });
  };

  return (
    <>
      <Card className="w-[600px] shadow-md">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Admin</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {role === "ADMIN" ? (
            <>
              <RoleGate allowedRole="ADMIN">
                <p className="text-sm font-medium">Admin</p>
                <Button>
                  <Link href="/adminpage">Admin Page</Link>
                </Button>
              </RoleGate>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="text-sm font-medium">Admin-only Api Route</p>
                <Button onClick={AdminApiRoute}>Click to test</Button>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="text-sm font-medium">Admin-only Server Action</p>
                <Button onClick={onServerActionClick}>Click to test</Button>
              </div>
            </>
          ) : (
            <RoleGate allowedRole="USER">
              <p className="text-sm font-medium">User</p>
            </RoleGate>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Admin;
