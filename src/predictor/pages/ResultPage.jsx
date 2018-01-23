import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination, BackTop } from 'antd';
import { ResultItem, ModalIncrease } from '../../components';
import 'antd/lib/pagination/style/css';
import 'antd/lib/back-top/style/css';


class ResultPage extends Component {
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

ResultPage.propTypes = {

};

ResultPage.defaultProps = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: 'INIT_RESULT_PAGE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
