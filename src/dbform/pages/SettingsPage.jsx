import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, DatePicker, TimePicker, Button, Select, Slider } from 'antd';
import PropTypes from 'prop-types';
import { addSettings } from '../core/actions';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;


const marks = {
  0: '0',
  2: '2',
  4: '4',
  6: '6',
  8: '8',
  10: '10',
  12: '12',
  14: '14',
  16: '16',
  18: '18',
  20: '20',
  22: '22',
  24: '24',
};


const SelectSettings = ({ items, dafault }) => (
  <Select defaultValue={dafault}>
    { items && items.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
  </Select>
);

const SliderSettings = ({ defaults }) => (<Slider max={24} step={1} defaultValue={defaults} />);

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

        this.props.setSettings(this.props.form.getFieldsValue());
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
            {getFieldDecorator('tabs.tabPosition', { initialValue: settings.tabs.tabPosition })(
              <Select>
                { itemsConfig.tabPosition.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
              </Select>,

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Size"
          >
            {getFieldDecorator('tabs.size', { initialValue: settings.tabs.size })(
              <Select>
                { itemsConfig.tabSize.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
              </Select>,
            )}
          </FormItem>
          <h4>List grid:</h4>
          <FormItem
            {...formItemLayout}
            label="gutter"
          >
            {getFieldDecorator('grid.gutter', { initialValue: settings.grid.gutter })(
              <Slider max={24} step={1} marks={marks} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="xs"
          >
            {getFieldDecorator('grid.xs', { initialValue: settings.grid.xs })(
              <Slider max={24} step={1} marks={marks} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="sm"
          >
            {getFieldDecorator('grid.sm', { initialValue: settings.grid.sm })(
              <Slider max={24} step={1} marks={marks} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="md"
          >
            {getFieldDecorator('grid.md', { initialValue: settings.grid.md })(
              <Slider max={24} step={1} marks={marks} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="lg"
          >
            {getFieldDecorator('grid.lg', { initialValue: settings.grid.md })(
              <Slider max={24} step={1} marks={marks} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="xl"
          >
            {getFieldDecorator('grid.xl', { initialValue: settings.grid.md })(
              <Slider max={24} step={1} marks={marks} />,
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
    setSettings: values => dispatch(addSettings(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
