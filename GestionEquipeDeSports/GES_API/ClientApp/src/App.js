import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { PageLoader } from "./components/page-loader";
import { useAuth0 } from '@auth0/auth0-react';

export default function App(){
  const { isLoading } = useAuth0();
    
  if (isLoading){
    return(
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
}

