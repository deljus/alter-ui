import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { SliderEditor, SlidersSelect, DynamicForm } from '../../components';
import sliderConfig from '../../components/formItemConfigs';
import DatabaseSelect from './DatabaseSelect';
import DatabaseTableSelect from './DatabaseTableSelect'

const Option = Select.Option;

const DBConditionList = ({
                         id,
                         solvents,
                         catalysts,
                         models,
                         temperature,
                         pressure,
                         formComponent,
                         form,
                         type,
                       }) => {
  function fieldName(name) {
    return `${name}-${type}-${id}`;
  }

  const FormItem = formComponent.Item;
  const { getFieldDecorator } = form;

  return (
    <Form>
      <DatabaseSelect
        formComponent={Form}
        form={form}
      />
      <DatabaseTableSelect
        formComponent={Form}
        form={form}
       />
      <FormItem
        label="Temperature:"
      >
        {getFieldDecorator(fieldName('temperature'), {
          initialValue: temperature,
        })(
          <SliderEditor
            {...sliderConfig.temperature}
          />,
        )}
      </FormItem>
      <FormItem
        label="Pressure (atm): "
      >
        {getFieldDecorator(fieldName('pressure'), {
          initialValue: pressure,
        })(
          <SliderEditor
            {...sliderConfig.pressure}
          />,
        )}
      </FormItem>
      <DynamicForm
        formComponent={formComponent}
        form={form}
      />
      { solvents && !!solvents.length && <FormItem label="Solvents">

        {getFieldDecorator(fieldName('solvents'))(
          <SlidersSelect data={solvents} sumEqual={100} />,
        )}
      </FormItem>}
      { catalysts && !!catalysts.length && <FormItem label="Solvents">

        {getFieldDecorator(fieldName('catalysts'))(
          <SlidersSelect data={catalysts} />,
        )}
      </FormItem>}
    </Form>
  );
};

DBConditionList.propTypes = {
  selectModel: PropTypes.number,
  models: PropTypes.array,
  catalysts: PropTypes.array,
  solvents: PropTypes.array,
  temperature: PropTypes.number,
  pressure: PropTypes.number,
  id: PropTypes.number,
  type: PropTypes.number,
};

DBConditionList.defaultProps = {
  selectModel: null,
  models: [],
  temperature: 298,
  pressure: 1,
  catalysts: [],
  solvents: [],
  type: 0,
};


export default DBConditionList;
