import React from 'react';
import { Layout } from 'antd';
import { MarvinEditorView, PageStepsView, LoaderView, ErrorView } from '../base/wrapper';

const { Header, Content, Footer } = Layout;

const Main = ({ children }) => (
  <Layout style={{ minHeight: '100vh', background: 'white' }} className="container">
    <Content>
      <PageStepsView />
      <MarvinEditorView />
      <LoaderView />
      <ErrorView />
      {children}
    </Content>
    <Footer style={{ background: 'white' }}>© Kazan Chemoinformatics and Molecular Modeling Laboratory 2018</Footer>
  </Layout>
);

export default Main;
