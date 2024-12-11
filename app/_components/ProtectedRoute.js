// components/ProtectedRoute.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children, role }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session || session.user.role !== role) {
    router.replace("/unauthorized");
    return null;
  }

  return children;
};

export default ProtectedRoute;
