import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, DatePicker, TimePicker, Button, Select, Slider } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

const SelectSettings = ({ items, dafault }) => (
  <Select defaultValue={dafault}>
    { items && items.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
  </Select>
);

const SliderSettings = ({}) => ;

const itemsConfig = {
  tabPosition: ['top', 'bottom', 'left', 'right'],
  tabSize: ['large', 'default', 'small'],
};

class SettingsForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
          ...fieldsValue,
          'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
          'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
          'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
          'range-time-picker': [
            rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
          ],
          'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
        };
        console.log('Received values of form: ', values);
      });
    }
    render() {
      const { settings } = this.props;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 12 },
        },
      };
      const config = {
        rules: [{ type: 'string' }],
      };
      return (
        <Form onSubmit={this.handleSubmit}>
          <h4>Tabs:</h4>
          <FormItem
            {...formItemLayout}
            label="Position"
          >
            {getFieldDecorator('tabPosition', config)(
              <SelectSettings items={itemsConfig.tabPosition} dafault={settings.tabs.tabPosition} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Size"
          >
            {getFieldDecorator('tabSize', config)(
              <SelectSettings items={itemsConfig.tabSize} dafault={settings.tabs.tabSize} />,
            )}
          </FormItem>
          <h4>List grid:</h4>
          <FormItem
            {...formItemLayout}
            label="gutter"
          >
            {getFieldDecorator('month-picker', config)(
              <Slider />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="xs"
          >
            {getFieldDecorator('range-picker', config)(
              <RangePicker />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="sm"
          >
            {getFieldDecorator('range-time-picker', config)(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="md"
          >
            {getFieldDecorator('time-picker', config)(
              <TimePicker />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="lg"
          >
            {getFieldDecorator('time-picker', config)(
              <TimePicker />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="xl"
          >
            {getFieldDecorator('time-picker', config)(
              <TimePicker />,
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button>Default</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      );
    }
}

const SettingsPage = Form.create()(SettingsForm);

SettingsPage.propTypes = {

};


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
