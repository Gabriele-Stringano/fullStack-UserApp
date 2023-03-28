import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {checkAuth} from './utils/AuthUtils'

const useAuthCheck = () => {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authStatus = await checkAuth();
      setIsAuth(authStatus);
    }
    fetchData();
  }, []);

  if (isAuth === null) {
    // waiting for authentication data
    return null;
  } else if (isAuth & Boolean(sessionStorage.getItem('user'))) {
    // the user is authenticated, render protected content
    return <Outlet />;
  } else {
    // the user is not authenticated, redirects to the login page
    return <Navigate to='/login' />;
  }
};

const ProtectedRoutes = () => {
  return useAuthCheck();
}

export default ProtectedRoutes;
