import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Row, Col } from 'antd';
import { DynamicForm } from '../../components';
import { MARVIN_PATH_IFRAME, MARVIN_EDITOR_IS_EMPTY } from '../../config';
import { clearEditor, exportCml } from '../../base/marvinAPI';
import { SAGA_ADD_STRUCTURE } from '../core/constants';

class CreatePage extends Component {
  handleSubmit(e) {
    const { createStructure, autoreset } = this.props;
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        const params = values.keys.map(k => ({
          key: values[`key-${k.id}`],
          value: values[`value-${k.id}`],
        }));
        exportCml('#marvinjs_create_page')
          .then((cml) => {
            if (cml === MARVIN_EDITOR_IS_EMPTY) {
              throw new Error('Structure is empty');
            }
            createStructure(cml, params, values.condition);
            if (autoreset) this.handlersReset();
          })
          .catch(e => message.error(e.message));
      }
    });
  }

  handlersReset() {
    this.form.resetFields();
    clearEditor('#marvinjs_create_page').catch(e => message.error(e.message));
  }

  render() {
    const { condition } = this.props;

    return (

      <Row gutter={30}>
        <Col md={14}>
          <iframe
            title="marvinjs"
            id="marvinjs_create_page"
            data-toolbars="reaction"
            src={MARVIN_PATH_IFRAME}
            width="100%"
            height={500}
            style={{ border: '1px dashed #d9d9d9', padding: '10px' }}
          />
        </Col>
        <Col md={10}>
          <DynamicForm ref={(form) => { this.form = form; }} condition={condition} />
        </Col>
        <Col md={24}>
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
          >Submit</Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  condition: state.settings.condition,
  autoreset: state.settings.auto_reset,
});


const mapDispatchToProps = dispatch => ({
  createStructure: (data, params, condition) => dispatch({ type: SAGA_ADD_STRUCTURE, data, params, condition }),
});


export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
