import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useVerifyUser from "../hooks/useVerifyUser";
import { localURL } from "../utils/apiRequest";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const {
    data: isLoggedIn,
    isLoading,
    error,
  } = useVerifyUser(`${localURL}/verify`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || error) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  return children;
};

export const PublicRouteProtect = ({ children }) => {
  const { data: isLoggedIn, isLoading } = useVerifyUser(`${localURL}/verify`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to={`/home`} replace />;
  }

  return children;
};
