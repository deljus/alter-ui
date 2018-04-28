import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Row, Col, Button } from 'antd';
import { Loader, Error, ConditionList, SliderEditor } from '../src/components';
import { models, selectModel, solvents, catalysts } from './variables';
import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.min.css';


storiesOf('Loader', module)
  .add('with text', () => (
    <Loader loading />
  ));
storiesOf('Error modal', module).add('Error modal', () => (
  <Error
    visible
    cancelBtn={() => { action('skip Error'); }}
    refreshBtn={() => { action('refresh page'); }}
  />
));
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
            <Button htmlType="submit">Submit</Button>
          </Form>
        </Col>
      </Row>));
    return <ConditionLists />;
  });
storiesOf('Edit sliders', module)
  .add('default', () => (
    <Row>
      <Col span={6} offset={9}>
        <SliderEditor />
      </Col>
    </Row>));
