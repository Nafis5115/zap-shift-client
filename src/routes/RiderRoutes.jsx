import React from "react";

import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <h1>Loading...</h1>;
  }

  if (role !== "rider") {
    return <h1>Forbidden Access</h1>;
  }

  return children;
};

export default RiderRoutes;
