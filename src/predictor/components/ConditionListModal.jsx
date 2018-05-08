import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import { ConditionList, Select } from '../../components';

const typeStructure = [{
  type: 1,
  name: 'Modelling',
},
{
  type: 2,
  name: 'Reaction',
}];

const Option = Select.Option;

const ConditionListModal = ({
  onOk,
  onCancel,
  visible,
  form,
}) => {
  const handleOk = () => {
    values = form.getFieldsValue();

    onOk();
  };

  const FormItem = Form.Item;
  const { getFieldDecorator } = form;


  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form>
        <FormItem
          label="Type structure:"
        >
          {getFieldDecorator('typeStructure', {
            initialValue: 1,
          })(
            <Select>
              { typeStructure.map((item, i) =>
                <Option key={item.name + i} value={item.type}>{ item.name }</Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <ConditionList
          id="translation"
          formComponent={Form}
          form={form}
        />
      </Form>
    </Modal>
  );
};

export default Form.create()(ConditionListModal);
