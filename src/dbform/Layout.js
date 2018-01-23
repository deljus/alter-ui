import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import {
  CreatePage,
  StructureListPage,
  SettingsPage,
} from './pages';
import { DBFormModalView } from './compWraps';
import {LoaderView, ErrorView } from '../base/wrapper';

import 'antd/lib/tabs/style/css';

const TabPane = Tabs.TabPane;

class Main extends Component {
  componentDidMount() {
    this.props.initPages();
  }

  render() {
    const { settings } = this.props;
    const tabs = settings && settings.tabs;
    return (
      <div>
        <LoaderView />
        <DBFormModalView />
        <ErrorView />
        <div className="container">
          <Tabs
            defaultActiveKey="2"
            {...tabs}
          >
            <TabPane tab={<span><Icon type="file-add" />Create</span>} key="1">
              <CreatePage />
            </TabPane>
            <TabPane tab={<span><Icon type="database" />List</span>} key="2">
              <StructureListPage />
            </TabPane>
            <TabPane tab={<span><Icon type="setting" />Settings</span>} key="3">
              <SettingsPage />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  initPages: () => dispatch({ type: 'INIT_STRUCTURE_LIST_PAGE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
