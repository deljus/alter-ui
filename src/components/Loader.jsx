import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContain = styled.div`
    z-index: 1;
    overflow: hidden;
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.4)
`;

const Loader = ({ loading }) => loading && (
  <LoaderContain>
    <Spin size="large" tip="Loading..." />
  </LoaderContain>
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};

export default Loader;
