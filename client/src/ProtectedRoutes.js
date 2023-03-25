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
    // in attesa dei dati di autenticazione
    return null;
  } else if (isAuth & Boolean(sessionStorage.getItem('user'))) {
    // l'utente è autenticato, renderizza il contenuto protetto
    return <Outlet />;
  } else {
    // l'utente non è autenticato, reindirizza alla pagina di login
    return <Navigate to='/login' />;
  }
};

const ProtectedRoutes = () => {
  return useAuthCheck();
}

export default ProtectedRoutes;
