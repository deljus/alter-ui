import React from 'react';
import { DBFormModal } from '../components';

const Main = ({ children }) => (
  <div>
    <DBFormModal />
    <div className="container">
      {children}
    </div>
  </div>
);

export default Main;
