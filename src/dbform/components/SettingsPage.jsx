import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Select, Slider, Switch } from 'antd';
import PropTypes from 'prop-types';
import { addSettings } from '../core/actions';
import { merge } from '../../base/functions';
import sliderConfig from '../../components/formItemConfigs';

const FormItem = Form.Item;
const { Option } = Select;

const itemsConfig = {
  tabPosition: ['top', 'bottom', 'left', 'right'],
  tabSize: ['large', 'default', 'small'],
};

const SettingsPage = ({ setSettings, settings }) => {
  const handleChange = (key, value) => {
    const keys = key.split('.');
    settings[keys] = value;
    setSettings(settings);
  };
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
  return (
    <Form>
      <h4>Tabs:</h4>
      <FormItem
        {...formItemLayout}
        label="Position"
      >
        <Select
          value={settings && settings.tabs.tabPosition}
          onChange={val => handleChange('tabs.tabPosition', val)}
        >
          { itemsConfig.tabPosition.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
        </Select>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Size"
      >
        <Select
          value={settings && settings.tabs.size}
          onChange={val => handleChange('tabs.size', val)}
        >
          { itemsConfig.tabSize.map((item, i) => <Option key={item + i} value={item} >{item}</Option>) }
        </Select>
      </FormItem>
      {/*<h4>Structure list page grid:</h4>*/}

      {/*{Object.keys(settings.grid).map(*/}
        {/*key =>*/}
          {/*(<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label={key}*/}
          {/*>*/}

            {/*<Slider*/}
              {/*{...sliderConfig.grid}*/}
              {/*value={settings && settings.grid[key]}*/}
              {/*onAfterChange={val => handleChange(key, val)}*/}
            {/*/>*/}

          {/*</FormItem>),*/}
      {/*)}*/}
      {/*<h4>Create page conditions:</h4>*/}
      {/*{Object.keys(settings.condition).map(*/}
        {/*key =>*/}
          {/*(<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label={key}*/}
          {/*>*/}
            {/*<Slider*/}
              {/*{...sliderConfig[key]}*/}
              {/*value={settings && settings.condition[key]}*/}
              {/*onAfterChange={val => handleChange(`condition.${key}`, val)}*/}
            {/*/>*/}
          {/*</FormItem>),*/}
      {/*)}*/}
      {/*<h4>Auto reset after submit in create page</h4>*/}

      {/*<FormItem*/}
        {/*{...formItemLayout}*/}
        {/*label="Auto reset"*/}
      {/*>*/}

        {/*<Switch*/}
          {/*value={settings && settings.auto_reset}*/}
          {/*onChange={val => handleChange('auto_reset', val)}*/}
        {/*/>*/}
      {/*</FormItem>*/}
    </Form>
  );
};


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setSettings: values => dispatch(addSettings(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
