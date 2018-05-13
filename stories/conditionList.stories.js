import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Row, Col, Button } from 'antd';
import { ConditionList, SliderEditor } from '../src/components';
import { models, selectModel, solvents, catalysts } from './variables';
import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.min.css';

storiesOf('ConditionList', module).add('ConditionList', () => {
  const ConditionLists = Form.create()(({ form }) => (
    <Row>
      <Col span={6} offset={9}>
        <Form>
          <ConditionList
            id="1"
            models={models}
            selectModel={selectModel}
            solvents={solvents}
            catalysts={catalysts}
            formComponent={Form}
            form={form}
          />
        </Form>
      </Col>
    </Row>));
  return <ConditionLists />;
})
  .add('Many conditionList', () => {
    const ConditionLists = Form.create()(({ form }) => (
      <Row>
        <Col span={6} offset={9}>
          <Form>
            {[1, 2].map(i =>
              (<ConditionList
                id={i}
                models={models}
                selectModel={selectModel}
                solvents={solvents}
                catalysts={catalysts}
                formComponent={Form}
                form={form}
              />),
            )}
          </Form>
        </Col>
      </Row>));
    return <ConditionLists />;
  })
  .add('Many conditionList Submit Form', () => {
    const ConditionLists = Form.create()(({ form }) => {
      const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
          }
        });
      };

      return (
        <Row>
          <Col span={6} offset={9}>
            <Form
              onSubmit={handleSubmit}
            >
              {[1, 2].map(i =>
                (<ConditionList
                  id={i}
                  models={models}
                  selectModel={selectModel}
                  solvents={solvents}
                  catalysts={catalysts}
                  formComponent={Form}
                  form={form}
                />),
              )}
              <Button htmlType="submit">Submit</Button>
            </Form>
          </Col>
        </Row>);
    });
    return <ConditionLists />;
  });
