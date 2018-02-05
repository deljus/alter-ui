import React, { Component } from 'react';
import { Form, Input, Icon, Button, Slider, InputNumber, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import sliderConfig from './formItemConfigs';

const FormItem = Form.Item;

const uuid = 0;
class DynamicFieldSet extends React.Component {
    state = {
      inputValue: 1,
    };
    onChange = (value) => {
      this.setState({
        inputValue: value,
      });
    };

    remove = (k) => {
      const { form } = this.props;
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
      form.setFieldsValue({
        keys: keys.filter(key => key.id !== k.id),
      });
    };

    getMaxOfArray = numArray => Math.max.apply(null, numArray);

    add = () => {
      const { form } = this.props;
      const keys = form.getFieldValue('keys');

      const newId = this.getMaxOfArray(keys.map(k => k.id)) + 1;

      const nextKeys = keys.concat({ id: newId, key: '', value: '' });

      form.setFieldsValue({
        keys: nextKeys,
      });
    };

    render() {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const { condition } = this.props;
      getFieldDecorator('keys', { initialValue: [{ id: 0, key: '', value: '' }] });
      const keys = getFieldValue('keys');
      const formItems = keys.map(k => (
        <FormItem
          required={false}
          key={k.id}
        >
          <Row>
            <Col xs={12} md={12} sm={12}>
              {getFieldDecorator(`key-${k.id}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's key.",

                }],
                initialValue: k.key,
              })(
                <Input placeholder="passenger name" style={{ width: '80%', marginRight: 16 }} />,
              )}
          :
            </Col>
            <Col xs={12} md={12} sm={12}>
              {getFieldDecorator(`value-${k.id}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's value.",
                }],
                initialValue: k.value,
              })(
                <Input placeholder="passenger name2" style={{ width: '80%', marginRight: 16 }} />,
              )}
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null}
            </Col>
          </Row>
        </FormItem>
      ));

      const cond = Object.keys(condition).map(
        key =>
          (<FormItem
            label={key}
            key={key}
          >
            {getFieldDecorator(`condition.${key}`, {
              initialValue: condition[key].value,
            })(
              <Slider
                {...sliderConfig[key]}
              />,
            )}
          </FormItem>),
      );

      return (
        <Form>
          {cond}
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </FormItem>
        </Form>
      );
    }
}

DynamicFieldSet.propTypes = {
  condition: PropTypes.object,
};

DynamicFieldSet.defaultProps = {
  condition: {},
};


const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet;
