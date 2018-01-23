import React from 'react';
import { Route, Switch, Router } from 'react-router';
import { Provider } from 'react-redux';
import store from './core/store';
import history from '../base/history';
import {
  IndexPage,
  ValidatePage,
  ResultPage,
  HistoryPage,
  InfoPage } from './pages';
import { NotFoundPage } from '../components';
import { URLS } from '../config';
import Main from './Layout';

export default (
  <Provider store={store}>
    <Router history={history}>
      <Main>
        <Switch>
          <Route exact path={URLS.INDEX} component={IndexPage} />
          <Route exact path={URLS.VALIDATE} component={ValidatePage} />
          <Route exact path={URLS.RESULT} component={ResultPage} />
          <Route exact path={URLS.HISTORY} component={HistoryPage} />
          <Route exact path={URLS.INFO} component={InfoPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Main>
    </Router>
  </Provider>
);
