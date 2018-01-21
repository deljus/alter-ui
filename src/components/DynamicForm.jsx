import React from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';
import 'antd/lib/form/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';

const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
    remove = (k) => {
      const { form } = this.props;
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    };

    add = () => {
      uuid++;
      const { form } = this.props;
      const keys = form.getFieldValue('keys');

      const nextKeys = keys.concat(uuid);

      form.setFieldsValue({
        keys: nextKeys,
      });
    };



    render() {
      const { getFieldDecorator, getFieldValue } = this.props.form;

      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map(k => (
        <FormItem
          required={false}
          key={k}
        >
          <Row>
            <Col xs={12} md={12} sm={12}>
              {getFieldDecorator(`key-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's key.",
                }],
              })(
                <Input placeholder="passenger name" style={{ width: '80%', marginRight: 16 }} />,
              )}
          :
            </Col>
            <Col xs={12} md={12} sm={12}>
              {getFieldDecorator(`value-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's value.",
                }],
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
      return (
        <Form>
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

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet;
