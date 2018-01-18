import React from 'react';
import { Tabs, Icon } from 'antd';
import { Route, Switch, Router } from 'react-router';
import store from './core/store';
import { Provider } from 'react-redux';
import history from '../core/history';
import {
  CreatePage,
  StructureListPage,
} from './pages';
import { DBFormModal } from '../components';
import { URLS } from '../config';
import Main from './Layout';


import 'antd/lib/tabs/style/css';

const TabPane = Tabs.TabPane;

export default (
  <Provider store={store}>
    <Router history={history}>
      <Main>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="file-add" />Create</span>} key="1">
            <CreatePage />
          </TabPane>
          <TabPane tab={<span><Icon type="database" />List</span>} key="2">
            <StructureListPage />
          </TabPane>
          <TabPane tab={<span><Icon type="setting" />Settings</span>} key="3">
              Tab 2
          </TabPane>
        </Tabs>
        {/* <Switch>
            <Route exact path={URLS.INDEX} component={CreatePage} />
            <Route exact path={URLS.RESULT} component={StructureListPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch> */}
      </Main>
    </Router>
  </Provider>
);
