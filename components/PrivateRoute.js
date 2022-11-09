import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, isUserLogged }) {
  const location = useLocation();

  return isUserLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />

  );
}