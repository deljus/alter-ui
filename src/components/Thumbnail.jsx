import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MARVIN_EDITOR_IS_EMPTY } from '../config';
import { Button as BaseButton, Alert } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/alert/style/css';

const Rigth = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
`;

const Button = styled(BaseButton)`
  border-color: #108ee9;
`;

const Thumbnail = ({ cml, base64, onClickImage, revalidate }) => (
  <span
    className="thumbnail"
  >

    <Rigth>
      <Button
        type="primary"
        ghost
        shape="circle"
        icon="edit"
        size="large"
        onClick={() => onClickImage(cml)}
      />
    </Rigth>
    <img
      style={{ width: '700px' }}
      src={base64}
    />
    {revalidate && <Alert message="Your structure has changed, please revalidate the structure" type="info" showIcon />}
  </span>
);

Thumbnail.propTypes = {
  cml: PropTypes.string,
  base64: PropTypes.string,
  revalidate: PropTypes.bool,
  onClickImage: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  cml: MARVIN_EDITOR_IS_EMPTY,
  revalidate: false,
};

export default Thumbnail;
