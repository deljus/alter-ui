import React from 'react';
import { MarvinEditorView, PageStepsView, LoaderView, ErrorView } from '../base/wrapper';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Main = ({ children }) => (
  <Layout>
    <Content style={{ paddingTop: 24, paddingLeft: 100, paddingRight: 100, background: '#fff', minHeight: 280 }}>
      <PageStepsView />
      <MarvinEditorView />
      <LoaderView />
      <ErrorView />
      {children}
    </Content>
  </Layout>
);

export default Main;
