// lib/useRole.js

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useRole = (requiredRole) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null; // Show loading spinner if session is loading

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  if (session.user.role !== requiredRole) {
    router.push("/");
    return null;
  }

  return session;
};
