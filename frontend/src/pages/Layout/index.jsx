import React from 'react';
import Header from '../../pages/Header/';
import Footer from '../../pages/Footer/';
import { Outlet } from 'react-router-dom';

export default function Layout() {
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
