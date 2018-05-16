import React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Slider, Switch } from 'antd';
import { addSettings } from '../core/actions';
import sliderConfig from '../../components/formItemConfigs';
import { currentGrid } from '../../base/functions';

const FormItem = Form.Item;
const { Option } = Select;

const itemsConfig = {
  tabPosition: ['top', 'bottom', 'left', 'right'],
  tabSize: ['large', 'default', 'small'],
};


const SettingsPage = ({ setSettings, settings }) => {
  const handleChange = (value, key, parent = null) => {
    if (parent) settings[parent][key] = value;
    else settings[key] = value;
    const serialObj = JSON.stringify(settings);
    localStorage.setItem('settings', serialObj);
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

  const currentGrigForWindow = currentGrid();
  const currentGridItem = settings.grid.filter(g => g.key === currentGrigForWindow);

  return (
    <Form>
      <h4>Tabs:</h4>
      <FormItem
        {...formItemLayout}
        label="Position"
      >
        <Select
          value={settings && settings.tabs.tabPosition}
          onChange={val => handleChange(val, 'tabPosition', 'tabs')}
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
          onChange={val => handleChange(val, 'size', 'tabs')}
        >
          { itemsConfig.tabSize.map((item, i) =>
            <Option key={item + i} value={item} >{item}</Option>,
          )}
        </Select>
      </FormItem>
      <h4>Structure list page grid:</h4>

      {Object.keys(currentGridItem).map(
        key =>
          (<FormItem
            {...formItemLayout}
            label={key}
          >

            <Slider
              {...sliderConfig.grid}
              value={settings && settings.grid[key]}
              onChange={val => handleChange(val, key, 'grid')}
            />

          </FormItem>),
      )}
      <h4>Create page conditions:</h4>
      {Object.keys(settings.condition).map(
        key =>
          (<FormItem
            {...formItemLayout}
            label={key}
          >
            <Slider
              {...sliderConfig[key]}
              value={settings && settings.condition[key]}
              onChange={val => handleChange(val, key, 'condition')}
            />
          </FormItem>),
      )}
      <h4>Auto reset after submit in create page</h4>

      <FormItem
        {...formItemLayout}
        label="Auto reset"
      >

        <Switch
          value={settings && settings.auto_reset}
          onChange={val => handleChange(val, 'auto_reset')}
        />
      </FormItem>
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
