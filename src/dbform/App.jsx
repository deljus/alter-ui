import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Button, message, Tabs, Icon, Select } from 'antd';
import { DynamicForm } from '../components';
import { MARVIN_PATH_IFRAME, MARVIN_EDITOR_IS_EMPTY, API_URLS } from '../config';
import { exportCml, clearEditor } from '../core/marvinAPI';

import 'antd/lib/message/style/css';
import 'antd/lib/tabs/style/css';
import 'antd/lib/select/style/css';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      tabPosition: 'top',
        tabSize: 'small',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        const params = values.keys.map(k => ({
          key: values[`key-${k}`],
          value: values[`value-${k}`],
        }));
        this.setState({ btnLoading: true });
        exportCml()
          .then((cml) => {
            if (cml === MARVIN_EDITOR_IS_EMPTY) {
              throw new Error('Structure is empty');
            }
            return axios.post(API_URLS.CREATE_STRUCTUSE, { data: cml, params });
          })
          .then(() => {
            message.success('Add structure');
            this.setState({ btnLoading: false });
          })
          .catch((e) => {
            this.setState({ btnLoading: false });
            message.error(e.message);
          });
      }
    });
  }

  handlersReset() {
    this.form.resetFields();
    clearEditor().catch(e => message.error(e.message));
  }

    changeTabPosition = (tabPosition) => {
      this.setState({ tabPosition });
    }

    changeTabSize = (tabSize) => {
        this.setState({ tabSize });
    }

    render() {
      const { btnLoading, tabPosition, tabSize } = this.state;

      return (
        <div>
          <div style={{ marginBottom: 16 }}>
              Tab position：
            <Select
              value={tabPosition}
              onChange={this.changeTabPosition.bind(this)}
              dropdownMatchSelectWidth={false}
            >
              <Option value="top">top</Option>
              <Option value="bottom">bottom</Option>
              <Option value="left">left</Option>
              <Option value="right">right</Option>
            </Select>
            Tab size：
            <Select
                value={tabSize}
                onChange={this.changeTabPosition.bind(this)}
                dropdownMatchSelectWidth={false}
            >
              <Option value="small">top</Option>
              <Option value="bottom">bottom</Option>
              <Option value="left">left</Option>
              <Option value="right">right</Option>
            </Select>
          </div>
          <Tabs defaultActiveKey="2" tabPosition={tabPosition}>
            <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
              <div className="container" style={{ paddingBottom: '30px' }}>
                <Row>
                  <PageHeader>DB form</PageHeader>
                  <Col md={8}>
                    <iframe
                      title="marvinjs"
                      id="marvinjs"
                      data-toolbars="reaction"
                      src={MARVIN_PATH_IFRAME}
                      width="100%"
                      height={500}
                      style={{ border: '1px dashed #d9d9d9', padding: '10px' }}
                    />
                  </Col>
                  <Col md={4}>
                    <DynamicForm ref={(form) => { this.form = form; }} />
                  </Col>
                  <Col md={12}>
                    <Button
                      size="large"
                      onClick={this.handlersReset.bind(this)}
                    >
              Reset
                    </Button>
                    <Button
                      className="pull-right"
                      type="primary"
                      icon="upload"
                      size="large"
                      onClick={this.handleSubmit.bind(this)}
                      loading={btnLoading}
                    >Submit</Button>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
            Tab 2
            </TabPane>
          </Tabs>
        </div>
      );
    }
}

export default App;
