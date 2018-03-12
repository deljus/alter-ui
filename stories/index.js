import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Loader, Error } from '../src/components';
import 'antd/dist/antd.min.css';

storiesOf('Loader', module)
  .add('with text', () => (
    <Loader loading />
  ))
  .add('wefwef', () => (
    <Error visible cancelBtn={()=>{alert('ergerg')}} refreshBtn={()=>alert('erferf')}/>
  ));
