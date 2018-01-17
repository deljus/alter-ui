import React from 'react';
import { Route, Switch, Router } from 'react-router';
import store from './core/store';
import { Provider } from 'react-redux';
import history from '../core/history';
import {
    CreatePage,
    StructureListPage,
} from './pages';
import { NotFoundPage } from '../components';
import { URLS } from '../config';
import Main from './Layout';

export default (
    <Provider store={store}>
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path={URLS.INDEX} component={CreatePage} />
            <Route exact path={URLS.RESULT} component={StructureListPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Main>
      </Router>
    </Provider>
);