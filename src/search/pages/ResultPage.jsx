import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination, BackTop } from 'antd';
import { ResultItem, ModalIncrease } from '../../components';
import { SearchInputView } from '../compWrapper';

const Wrapper = styled.div`
    padding-bottom: 20px;
`;

const CenterWrap = styled.div`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 40px;
    text-align: center;
`;

const ResultWrapped = styled.div`
    padding-top: 50px;
`;

const RightWrap = styled.div`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 40px;
    text-align: right;
`;

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  render() {
    const { results, showIncreaseModel, onSearchImg } = this.props;

    return results && (
      <div>
        <Wrapper>
          <SearchInputView />
        </Wrapper>

        <ResultWrapped>
          {results && results.map((result, count) =>
            (<ResultItem
              count={ count }
              base64={result.base64}
              onClickIcrease={() => showIncreaseModel(result.base64)}
              result={result.models[0].results}
              onSearchImage={() => onSearchImg(result.data)}
            />),
          )
          }
        </ResultWrapped>

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
  results: state.results,
});

const mapDispatchToProps = dispatch => ({
    showIncreaseModel: () => null,
    onSearchImg: cml => dispatch({ type: 'CREATE_TASK', cml }),
    initPage: () => dispatch({ type: 'INIT_RESULT_PAGE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
