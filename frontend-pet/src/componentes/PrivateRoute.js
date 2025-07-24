import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles, onlyUserId }) => {
  const user = JSON.parse(localStorage.getItem('usuario'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  if (onlyUserId && user.userId !== onlyUserId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;


