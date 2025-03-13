"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

function SignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function signout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(signout);
      }}
    >
      Sign out
    </Button>
  );
}

export default SignOut;
