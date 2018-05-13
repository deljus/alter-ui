import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const SliderEditor = props => (
  <Row>
    <Col span={18}>
      <Slider {...props} />
    </Col>
    <Col
      span={6}
      style={{ textAlign: 'right' }}
    >
      <InputNumber
        {...props}
        style={{ width: '60px' }}
      />
    </Col>
  </Row>
);

export default SliderEditor;
