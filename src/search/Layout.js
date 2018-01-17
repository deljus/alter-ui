import React from 'react';
import { MarvinEditorView, PageStepsView, LoaderView, ErrorView } from './compWrapper';

const Main = ({ children }) => (
  <div className="container">
    <PageStepsView />
    <MarvinEditorView />
    <LoaderView />
    <ErrorView />
    {children}
  </div>
);

export default Main;
