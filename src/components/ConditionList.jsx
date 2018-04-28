import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Slider, InputNumber, Row, Col } from 'antd';
import { SliderEditor } from '../components';

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
  handleSolventChange() {

  }

  render() {
    const { id, solvents, catalysts, models, temperature, pressure, formComponent, form } = this.props;
    const formItemLayout = {
      style: { lineHeight: '10px' },
    };
    const FormItem = formComponent.Item;
    const { getFieldDecorator } = form;

    return (
      <div>
        <FormItem>
          <h4>Model: </h4>
          {getFieldDecorator(`model-${id}`, {
            rules: [{ required: true, message: 'Please select model!' }],
          })(
            <Select placeholder="Please select a country">
              { models.map((item, i) => <Option key={item.name + i} value={item.model}>{ item.name }</Option>) }
            </Select>,
          )}
        </FormItem>
        <FormItem
          label="temperature"
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
        { solvents && !!solvents.length && <FormItem>
          <h4>Solvents: </h4>
          {getFieldDecorator(`solvents-${id}`,
            { onChange: this.handleSolventChange })(
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
              >
                { solvents.map((item, i) => <Option key={item.additive + i} value={item.additive}>{ item.name }</Option>) }
              </Select>,
          )}
        </FormItem>}
        { catalysts && !!catalysts.length && <FormItem>
          <h4>Catalysts: </h4>
          {getFieldDecorator(`catalysts-${id}`)(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
            >
              { catalysts.map((item, i) => <Option key={item.additive + i} value={item.additive}>{ item.name }</Option>) }
            </Select>,
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
