import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon, Select } from 'antd';
import {
  CreatePage,
  StructureListPage,
  SettingsPage,
  DBFormModalView,
  ProcessPage,
} from './components';
import { LoaderView, ErrorView } from '../base/wrapper';
import { MainLayout } from '../components';
import {
  SAGA_INIT_STRUCTURE_LIST_PAGE
} from './core/constants';
import 'antd/dist/antd.css';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Main extends Component {
  componentDidMount() {
    this.props.initPages();
  }

  render() {
    const { settings } = this.props;
    const tabs = settings && settings.tabs;

    return (
      <MainLayout style={{ paddingTop: 75 }}>
        <LoaderView />
        <DBFormModalView />
        <ErrorView />
        <Tabs
          defaultActiveKey="3"
          {...tabs}
          tabBarExtraContent={<Select style={{ width: 200 }} >
            <Option value="dscsdc">vsdsdv</Option>
          </Select>}
        >
          <TabPane tab={<span><Icon type="file-add" />Create</span>} key="1">
            <CreatePage />
          </TabPane>
          <TabPane tab={<span><Icon type="retweet" />Process</span>} key="2">
            <ProcessPage />
          </TabPane>
          <TabPane tab={<span><Icon type="database" />List</span>} key="3">
            <StructureListPage />
          </TabPane>
          <TabPane tab={<span><Icon type="setting" />Settings</span>} key="4">
            <SettingsPage />
          </TabPane>

        </Tabs>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  initPages: () => dispatch({ type: SAGA_INIT_STRUCTURE_LIST_PAGE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
