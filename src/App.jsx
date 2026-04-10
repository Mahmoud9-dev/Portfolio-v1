import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@components';
import IndexPage from '@pages/index';
import ArchivePage from '@pages/archive';
import NotFoundPage from '@pages/404';

const App = () => {
  const location = useLocation();

  return (
    <Layout location={location}>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
