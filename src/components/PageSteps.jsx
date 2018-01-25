import React from 'react';
import Steps from 'antd/lib/steps';
import 'antd/lib/steps/style/css';
import styled from 'styled-components';
import { URLS } from '../config';

const Step = Steps.Step;

const WrapperSteps = styled.div`
    padding-bottom: 50px;
`;

const PageSteps = () => {
  let currentPage = 0;

  Object.keys(URLS).forEach(
    (key, value) => {
      if (window.location.hash.search(URLS[key])) currentPage = key;
    },
  );

  return (<WrapperSteps>
    <Steps current={currentPage}>
      <Step title="Start" description="Choosing a structure for searching" />
      <Step title="Validate" description="The choice of model and the correctness of the structure" />
      <Step title="Result" description="Search results" />
    </Steps>
  </WrapperSteps>);
};

export default PageSteps;
