import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh', background: 'white' }} className="container">
    <Content style={{ marginTop: 75 }}>
      {children}
    </Content>
    <Footer style={{ background: 'white' }} >© Kazan Chemoinformatics and Molecular Modeling Laboratory 2018</Footer>
  </Layout>
);

export default MainLayout;
