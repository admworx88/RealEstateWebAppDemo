import React, { useEffect } from 'react';
import Header from '../../pages/Header/';
import Footer from '../../pages/Footer/';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { useMutation } from 'react-query';

export default function Layout() {
  const { isAuthenticated, user } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createHashRouter(user?.email),
  });

  useEffect(() => {
    if (isAuthenticated) {
      setUserDetails((prev) => ({
        ...prev,
        token: user.sub,
      }));
    }
  }, [isAuthenticated, user, setUserDetails]);

  return (
    <>
      <div style={{ background: 'var(--black)', overflow: 'hidden' }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
