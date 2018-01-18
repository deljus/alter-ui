import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Button, message } from 'antd';
import { DynamicForm } from '../../components';
import { MARVIN_PATH_IFRAME, MARVIN_EDITOR_IS_EMPTY, API_URLS } from '../../config';
import { exportCml, clearEditor } from '../../core/marvinAPI';

import 'antd/lib/message/style/css';

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
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

  render() {
    const { btnLoading } = this.state;
    return (

      <Row>
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
    );
  }
}

export default CreatePage;
