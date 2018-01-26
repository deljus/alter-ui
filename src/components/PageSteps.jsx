import React from 'react';
import Steps from 'antd/lib/steps';
import 'antd/lib/steps/style/css';
import styled from 'styled-components';
import { URLS } from '../config';
import { getUrlPath } from '../base/parseUrl';

const Step = Steps.Step;

const WrapperSteps = styled.div`
    padding: 50px 0;
`;

const PageSteps = () => {
  let currentPage = 0;
  const urlPath = getUrlPath();
  Object.keys(URLS).forEach(
    (key, value) => {
      if (urlPath === URLS[key]) currentPage = value;
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
