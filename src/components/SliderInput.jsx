import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const SliderEditor = props => (
  <Row>
    <Col span={12}>
      <Slider {...props} />
    </Col>
    <Col span={4}>
      <InputNumber
        {...props}
        style={{ marginLeft: 16 }}
      />
    </Col>
  </Row>
);

export default SliderEditor;
