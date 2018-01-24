import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Select } from 'antd';
import { List, Icon, Collapse, Card, Popconfirm } from 'antd';

const Panel = Collapse.Panel;
const Option = Select.Option;
class SettingsPage extends Component {
  componentDidMount() {
    this.props.initPage();
  }

    state = {
      tabPosition: 'top',
      tabSize: 'default',
      tabType: 'line',
    }
    changeTabPosition = (tabPosition) => {
      this.setState({ tabPosition });
    };

    changeTabSize = (tabSize) => {
      this.setState({ tabSize });
    };

    changeTabType = (tabType) => {
      this.setState({ tabType });
    }

    render() {
      return (
        <div>
          <div style={{ marginBottom: 16 }}>
                Tab position：
            <Select
              value={this.state.tabPosition}
              onChange={this.changeTabPosition}
              dropdownMatchSelectWidth={false}
            >
              <Option value="top">top</Option>
              <Option value="bottom">bottom</Option>
              <Option value="left">left</Option>
              <Option value="right">right</Option>
            </Select>
          </div>
          <div style={{ marginBottom: 16 }}>
                Tab size：
            <Select
              value={this.state.tabSize}
              onChange={this.changeTabSize}
              dropdownMatchSelectWidth={false}
            >
              <Option value="small">small</Option>
              <Option value="default">default</Option>
              <Option value="large">large</Option>
            </Select>
          </div>
          <div style={{ marginBottom: 16 }}>
                Tab type：
            <Select
              value={this.state.tabType}
              onChange={this.changeTabType}
              dropdownMatchSelectWidth={false}
            >
              <Option value="line">line</Option>
              <Option value="card">card</Option>
            </Select>
          </div>
        </div>
      );
    }
}

SettingsPage.propTypes = {
  initPage: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  structures: state.structures,
});

const mapDispatchToProps = dispatch => ({
  initPage: () => null,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
