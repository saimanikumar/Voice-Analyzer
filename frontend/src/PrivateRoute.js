import React from 'react';
import { Route, useNavigate } from 'react-router';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : navigate("/login")
      }
    />
  );
};

export default PrivateRoute;
