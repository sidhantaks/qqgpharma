import { Navigate } from "react-router";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  if (typeof window === "undefined") return <Navigate to="/signin" replace />;
  const tokenPresent = !!localStorage.getItem("token");
  return tokenPresent ? <>{children}</> : <Navigate to="/signin" replace />;
}
