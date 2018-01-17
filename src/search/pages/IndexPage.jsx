import React from 'react';
import styled from 'styled-components';
import { SearchInputView } from '../compWrapper';

const IndexPageWrapper = styled.div`
    position: absolute;
    top: 40%;
`;

const IndexPage = () => (
  <IndexPageWrapper className="container seach-container">
    <SearchInputView />
  </IndexPageWrapper>
);


export default IndexPage;
