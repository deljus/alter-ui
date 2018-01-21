import React from 'react';
import { DBFormModalView } from './compWraps';

const Main = ({ children }) => (
  <div>
    <DBFormModalView />
    <div className="container">
      {children}
    </div>
  </div>
);

export default Main;
