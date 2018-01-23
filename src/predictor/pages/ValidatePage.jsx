import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';
import { Thumbnail } from '../../components';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';
import 'antd/lib/select/style/css';


class ValidatePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  render() {
    return (
      <div />
    );
  }
}

ValidatePage.propTypes = {
  initPage: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: 'INIT_VALIDATE_PAGE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePage);
