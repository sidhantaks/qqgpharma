import React from "react";
import { Navigate } from "react-router";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  if (typeof window === "undefined") return <Navigate to="/signin" replace />;
  const tokenPresent = !!localStorage.getItem("token");
  return tokenPresent ? children : <Navigate to="/signin" replace />;
}
