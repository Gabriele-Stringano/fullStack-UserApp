import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuthCheck = () => {
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/checkAuth", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      return data.result.authorised;
    } catch (err) {
      console.log(err);
    }
  };

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
  } else if (isAuth) {
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
