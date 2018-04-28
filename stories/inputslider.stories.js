import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Row, Col, Button } from 'antd';
import { SliderEditor } from '../src/components';
import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.min.css';


storiesOf('Edit sliders', module)
  .add('default', () => {
    const SliderForm = Form.create()(({ form }) => {
      const handleSubmit = (e) => {
        console.log('values');
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
          }
        });
      };

      const FormItem = Form.Item;
      const { getFieldDecorator } = form;

      return (<Row>
        <Col span={6} offset={9}>
          <Form onSubmit={handleSubmit}>
            <FormItem
              label="Model"
              help="sdvsdvsdvsdv"
              validateStatus='error'
            >
              {getFieldDecorator('model', {
                initialValue: 10,
                rules: [{
                  type: 'number',
                  message: 'Please select model!',
                }],
              })(
                <SliderEditor min={8}
                              max={12}/>,
              )}
            </FormItem>
            <Button htmlType="submit" >Submit</Button>
          </Form>
        </Col>
      </Row>);
    });

    return <SliderForm />;
  });
