import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Button, Popover, Row, Col, Input } from 'antd';

const SliderEditor = (props) => {
  const { slider, input, popover } = props;
  return (
    <Row gutter={24}>
      <Col span={20}>
        <Slider {...slider} />
      </Col>
      <Col span={4}>
        <Popover
          trigger="click"
          content={
            <div>
              <Input {...input} />
              <Button
                onClick={() => null}
              >
              Ok
              </Button>
            </div>}
          {...popover}
        >
          <Button
            type="primary"
            ghost
            icon="edit"
          />
        </Popover>
      </Col>
    </Row>
  );
};

SliderEditor.propTypes = {
  slider: PropTypes.object,
  input: PropTypes.object,
  popover: PropTypes.object,
};

export default SliderEditor;
