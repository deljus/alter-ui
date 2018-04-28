import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Row, Col, Button } from 'antd';
import { Loader, Error, ConditionList, SliderEditor } from '../src/components';
import { models, selectModel, solvents, catalysts } from './variables';
import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.min.css';


storiesOf('Loader', module)
  .add('with text', () => (
    <Loader loading />
  ));
storiesOf('Error modal', module).add('Error modal', () => (
  <Error
    visible
    cancelBtn={() => { action('skip Error'); }}
    refreshBtn={() => { action('refresh page'); }}
  />
));
