import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon, Layout } from 'antd';
import {
  CreatePage,
  StructureListPage,
  SettingsPage,
} from './pages';
import { DBFormModalView } from './compWraps';
import { LoaderView, ErrorView } from '../base/wrapper';
import 'antd/dist/antd.css';

const TabPane = Tabs.TabPane;
const { Header, Content, Footer } = Layout;

class Main extends Component {
  componentDidMount() {
    this.props.initPages();
  }

  render() {
    const { settings } = this.props;
    const tabs = settings && settings.tabs;
    return (
      <Layout style={{ minHeight: '100vh', background: 'white' }} className="container">
        <LoaderView />
        <DBFormModalView />
        <ErrorView />
        <Content style={{ paddingTop: 75 }}>
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
        </Content>
        <Footer style={{ background: 'white' }}>© Kazan Chemoinformatics and Molecular Modeling Laboratory 2018</Footer>
      </Layout>
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
