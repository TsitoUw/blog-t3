"use server";

import { auth } from "@/lib/auth";

export async function signinEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  return {
    success: !!res.ok,
  };
}
