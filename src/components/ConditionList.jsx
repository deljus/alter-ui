import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Slider, InputNumber, Row, Col } from 'antd';


const Option = Select.Option;

const temperatureConfig = {
  max: 400,
  min: 200,
  marks: {
    200: {
      style: {
        color: '#1890ff',
      },
      label: <strong>200</strong>,
    },
    273: '273',
    298: '298',
    400: {
      style: {
        color: '#f50',
      },
      label: <strong>400</strong>,
    },
  },
  step: 1,
};

const pressureConfig = {
  max: 6,
  min: 0,
  marks: {
    0: {
      style: {
        color: '#1890ff',
      },
      label: <strong>0</strong>,
    },
    1: '1',
    3: '3',
    6: {
      style: {
        color: '#f50',
      },
      label: <strong>6</strong>,
    },
  },
  step: 0.1,
};

const ConditionList = ({ id, allAdditives, changeAdditives, allModels, changeModels, models, temperature, tempChange, pressChange, pressure, additives, structure }) => {

  const setDefaultAmount = (additives) => {
    if (additives.length) {
      const persent = +(100 / additives.length).toFixed(1);
      const lastPersent = +(persent + (100 - (additives.length * persent))).toFixed(1);
      this.setState({ selectedAdditives: additives.map((id, i) =>
        (i < additives.length - 1 ? { id, value: persent } : { id, value: lastPersent })),
      });
    }
  };

  return (
    <Row gutter={10}>
      <Col span={24}>
            Models:
      </Col>
      <Col span={24}>
        <Select
          mode="multiple"
          placeholder="Please select a models"
          style={{ width: '100%' }}
          onBlur={models => changeModels(id, models)}
        >
          {allModels.map((item, i) => <Option key={item.name + i} value={item.model}>{item.name}</Option>)}
        </Select>
      </Col>
      <Col span={19}>
            Temperature (K):
      </Col>
      <Col span={5} style={{ textAlign: 'right' }}>
        <InputNumber
          value={temperature}
          onChange={t => tempChange(id, t)}
          {...temperatureConfig}
        />
      </Col>
      <Col span={24}>
        <Slider
          value={temperature}
          onChange={t => tempChange(id, t)}
          {...temperatureConfig}
        />
      </Col>
      <Col span={19}>
            Pressure (atm):
      </Col>
      <Col span={5} style={{ textAlign: 'right' }}>
        <InputNumber
          value={pressure}
          onChange={p => pressChange(id, p)}
          {...pressureConfig}
        />
      </Col>
      <Col span={24}>
        <Slider
          value={pressure}
          onChange={p => pressChange(id, p)}
          {...pressureConfig}
        />
      </Col>
      <Col span={24}>
            Additives:
      </Col>
      <Col span={24}>
        <Select
          mode="multiple"
          placeholder="Please select a models"
          style={{ width: '100%', paddingBottom: 20 }}
          onBlur={additives => setDefaultAmount(additives)}
        >
          {allAdditives.map((item, i) => <Option key={item.name + i} value={item.additive}>{item.name}</Option>)}
        </Select>
      </Col>
    </Row>
  );
};

ConditionList.propTypes = {
  selectModel: PropTypes.number,
  models: PropTypes.array,
  additives: PropTypes.array,
  temperature: PropTypes.number,
  pressure: PropTypes.number,
  allAdditives: PropTypes.array,
  addModels: PropTypes.array,
};

ConditionList.defaultProps = {
  selectModel: null,
  models: [],
  temperature: 298,
  pressure: 1,
  additives: [],
  allAdditives: [],
  addModels: [],
};


export default Form.create()(ConditionList);
