import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CreatePoint from './pages/CreatePoint';
import Home from './pages/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={CreatePoint} />
    </BrowserRouter>
  );
};

export default Routes;
