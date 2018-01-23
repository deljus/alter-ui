import React from 'react';
import { MarvinEditorView, PageStepsView, LoaderView, ErrorView } from '../base/wrapper';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Main = ({ children }) => (
  <Layout>
    <Content style={{ padding: 24, background: '#fff', minHeight: 280 }}>
      <PageStepsView />
      <MarvinEditorView />
      <LoaderView />
      <ErrorView />
      {children}
    </Content>
  </Layout>
);

export default Main;
