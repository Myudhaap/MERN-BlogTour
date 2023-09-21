import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/features/authSlice";

const Protected = ({ children }) => {
  const user = useSelector(getUser);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default Protected;
