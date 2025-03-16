"use client";
import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

function SignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function signout() {
    const utils = api.useUtils();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          utils.invalidate().catch((e) => console.error(e));
          router.refresh();
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
