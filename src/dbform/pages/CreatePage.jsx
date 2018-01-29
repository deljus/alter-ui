import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Button, message } from 'antd';
import { DynamicForm } from '../../components';
import { MARVIN_PATH_IFRAME, MARVIN_EDITOR_IS_EMPTY } from '../../config';
import { clearEditor, exportCml } from '../../base/marvinAPI';

class CreatePage extends Component {

  handleSubmit(e) {
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        const params = values.keys.map(k => ({
          key: values[`key-${k.id}`],
          value: values[`value-${k.id}`],
        }));
        this.setState({ btnLoading: true });
        exportCml('#marvinjs_create_page')
          .then((cml) => {
            if (cml === MARVIN_EDITOR_IS_EMPTY) {
              throw new Error('Structure is empty');
            }
            this.props.createStructure(cml, params);
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
    return (

      <Row>
        <Col md={8}>
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
          >Submit</Button>
        </Col>
      </Row>
    );
  }
}


CreatePage.propTypes = {
  initPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createStructure: (data, params) => dispatch({ type: 'ADD_STRUCTURE_SAGA', data, params }),
});


export default connect(null, mapDispatchToProps)(CreatePage);
