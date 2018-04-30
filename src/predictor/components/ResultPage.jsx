import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';
import { ResultItem, ModalIncrease } from '../../components';
import {
  SAGA_INIT_RESULT_PAGE,
} from '../core/constants';

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  render() {
    const { results } = this.props;

    return results && (
      <div>

        {results && results.map((result, count) =>
          (<ResultItem
            count={count}
            base64={result.base64}
            onClickIcrease={() => showIncreaseModel(result.base64)}
            result={result.models[0].results}
            onSearchImage={() => onSearchImg(result.data)}
          />),
        )
        }

        <BackTop />
      </div>
    );
  }
}

ResultPage.propTypes = {

};

ResultPage.defaultProps = {

};

const mapStateToProps = state => ({
  results: null,
});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: SAGA_INIT_RESULT_PAGE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
