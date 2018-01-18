import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Button, message } from 'antd';
import DynamicForm from './DynamicForm';
import { MARVIN_PATH_IFRAME, MARVIN_EDITOR_IS_EMPTY, API_URLS } from '../config';
import { exportCml, clearEditor } from '../core/marvinAPI';

import 'antd/lib/message/style/css';

const Modal = styled.div`
  opacity: ${props => (props.isShow ? 1 : 0)};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => (props.isShow ? 100 : -1)};

  outline: 0;
  background: rgba(0,0,0,0.4);
`;

const Content = styled.div`
    position: relative;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    outline: 0;
`;

const Body = styled.div`
  position: relative;
  padding: 5px;
`;

const Iframe = styled.iframe`
  border: 0;
`;


class DBFormModal extends Component {
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
      <Modal isShow={0}>
        <Content>
          <div className="modal-header">
            <button
              type="button"
              className="close"
              // onClick={onCancel}
            >
                    &times;
            </button>
          </div>
          <Body>
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
          </Body>
        </Content>
      </Modal>
    );
  }
}

export default DBFormModal;
