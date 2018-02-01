import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Slider, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;
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
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }


    render() {
      const { getFieldDecorator } = this.props.form;
      const { selectModel, models, temperature, pressure, additives } = this.props;
      const formItemLayout = {
        style: { lineHeight: '10px' },
      };
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <h4>Model: </h4>
            {getFieldDecorator('model', {
              initialValue: selectModel,
            })(
              <Select placeholder="Please select a country">
                { models.map((item, i) => <Option key={item.name + i} value={item.model}>{ item.name }</Option>) }
              </Select>,
            )}
          </FormItem>
          <FormItem>
            <h4>Temperature (K): </h4>
            <Row gutter={10}>
              <Col span={19}>
                {getFieldDecorator('temperature', {
                  initialValue: temperature,
                })(
                  <Slider
                    {...temperatureConfig}
                  />,
                )}
              </Col>
              <Col span={5} style={{ textAlign: 'right' }} >
                {getFieldDecorator('temperature', {
                  initialValue: temperature,
                })(
                  <InputNumber
                    {...temperatureConfig}
                  />,
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <h4>Pressure (atm): </h4>
            <Row gutter={10}>
              <Col span={19}>
                {getFieldDecorator('pressure', {
                  initialValue: pressure,
                })(
                  <Slider
                    {...pressureConfig}
                  />,
                )}
              </Col>
              <Col span={5} style={{ textAlign: 'right' }}>
                {getFieldDecorator('pressure', {
                  initialValue: pressure,
                })(
                  <InputNumber
                    {...pressureConfig}
                  />,
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <h4>Solvents: </h4>
            {getFieldDecorator('selectedSolvents')(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
              >
                { additives.map((item, i) => <Option key={item.additive + i} value={item.additive}>{ item.name }</Option>) }
              </Select>,
            )}
          </FormItem>
        </Form>
      );
    }
}

ConditionList.propTypes = {
  selectModel: PropTypes.number,
  models: PropTypes.array,
  additives: PropTypes.array,
  temperature: PropTypes.number,
  pressure: PropTypes.number,
};

ConditionList.defaultProps = {
  selectModel: null,
  models: [],
  temperature: 298,
  pressure: 1,
  additives: [],
};


export default Form.create()(ConditionList);
