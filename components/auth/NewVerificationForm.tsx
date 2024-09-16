"use client";

import { SyncLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { useCallback, useEffect, useState } from "react";
import { FormSuccess } from "../FormSucces";
import { FormError } from "../FormError";
import { useSearchParams, useRouter } from "next/navigation";
import { CardWrapper } from "./CardWrapper";

export const NewVerificationForm = () => {
  const [verificationState, setVerificationState] = useState<{
    success: string | null;
    error: string | null;
    loading: boolean;
  }>({
    success: null,
    error: null,
    loading: true,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { success, error, loading } = verificationState;

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setVerificationState({
        success: null,
        error: "Missing token",
        loading: false,
      });
      return;
    }

    try {
      const result = await newVerification(token);
      if (result.error) {
        setVerificationState({
          success: null,
          error: result.error,
          loading: false,
        });
      } else if (result.success) {
        setVerificationState({
          success: result.success,
          error: null,
          loading: false,
        });
        setTimeout(() => {
          router.push("/settings");
        }, 1000);
      }
    } catch (error) {
      setVerificationState({
        success: null,
        error: "An unexpected error occurred",
        loading: false,
      });
    }
  }, [token, router, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verify your email"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {loading && <SyncLoader />}
        {!loading && success && <FormSuccess message={success} />}
        {!success && error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
