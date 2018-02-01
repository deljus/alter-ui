import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Select, Slider } from 'antd';
import PropTypes from 'prop-types';
import { addSettings } from '../core/actions';
import { merge } from '../../base/functions';

const FormItem = Form.Item;
const { Option } = Select;

const itemsConfig = {
  tabPosition: ['top', 'bottom', 'left', 'right'],
  tabSize: ['large', 'default', 'small'],
};

class SettingsForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      const { setSettings, settings } = this.props;
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        setSettings(merge(settings, fieldsValue));
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

          {Object.keys(settings.grid).map(
            key =>
              (<FormItem
                {...formItemLayout}
                label={key}
              >
                {getFieldDecorator(`grid.${key}`, { initialValue: settings.grid[key] })(
                  <Slider max={6} step={1} />,
                )}
              </FormItem>),
          )}
          <h4>Conditions:</h4>
          {Object.keys(settings.condition).map(
            key =>
              (<FormItem
                {...formItemLayout}
                label={key}
              >
                {getFieldDecorator(`condition.${key}.value`, { initialValue: settings.condition[key].value })(
                  <Slider
                    min={settings.condition[key].min}
                    max={settings.condition[key].max}
                    step={settings.condition[key].step}
                  />,
                )}
              </FormItem>),
          )}
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
  setSettings: values => dispatch(addSettings(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
