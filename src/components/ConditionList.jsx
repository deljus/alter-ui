import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Slider, InputNumber, Row, Col, Button } from 'antd';
import { SliderEditor, SlidersSelect } from '../components';

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


class ConditionList extends Component {
  render() {
    const { id, solvents, catalysts, models, temperature, pressure, formComponent, form } = this.props;
    const formItemLayout = {
      style: { lineHeight: '10px' },
    };
    const FormItem = formComponent.Item;
    const { getFieldDecorator } = form;

    return (
      <div>
        <div style={{ textAlign: 'right', position: 'absolute'}}>
          <Button shape="circle" icon="link"/>
        </div>
        <FormItem
          label="Models:"
        >
          {getFieldDecorator(`models-${id}`, {
            rules: [{
              required: true,
              message: 'Please select model!'
            }],
          })(
            <Select
              mode="multiple"
              placeholder="Please select a model"
            >
              { models.map((item, i) => <Option key={item.name + i} value={item.model}>{ item.name }</Option>) }
            </Select>,
          )}
        </FormItem>
        <FormItem
          label="Temperature:"
        >
          {getFieldDecorator(`temperature-${id}`, {
            initialValue: temperature,
          })(
            <SliderEditor
              {...temperatureConfig}
            />,
          )}
        </FormItem>
        <FormItem
          label="Pressure (atm): "
        >
          {getFieldDecorator(`pressure-${id}`, {
            initialValue: pressure,
          })(
            <SliderEditor
              {...pressureConfig}
            />,
          )}
        </FormItem>
        { solvents && !!solvents.length && <FormItem label="Solvents">

          {getFieldDecorator(`additives-${id}`)(
            <SlidersSelect data={solvents} sumEqual={100} />,
          )}
        </FormItem>}
        { catalysts && !!catalysts.length && <FormItem label="Solvents">

          {getFieldDecorator(`additives-1${id}`)(
            <SlidersSelect data={catalysts} />,
          )}
        </FormItem>}
      </div>
    );
  }
}

ConditionList.propTypes = {
  selectModel: PropTypes.number,
  models: PropTypes.array,
  catalysts: PropTypes.array,
  solvents: PropTypes.array,
  temperature: PropTypes.number,
  pressure: PropTypes.number,
  id: PropTypes.number,
};

ConditionList.defaultProps = {
  selectModel: null,
  models: [],
  temperature: 298,
  pressure: 1,
  catalysts: [],
  solvents: [],
};


export default ConditionList;
