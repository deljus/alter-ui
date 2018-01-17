import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';
import { Thumbnail } from '../../components';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';
import 'antd/lib/select/style/css';

const Option = Select.Option;

const ButtonBack = styled.button`
    float: left;
`;

const ButtonContinue = styled.button`
    float: right;
`;

const Live = styled.div`
  padding-bottom: 20px;
`;

class ValidatePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  render() {
    const { structure, openEditModal, changeSelectedModel, history, onRevalidate, onContinue, request } = this.props;
    return !request.loading && !request.error && structure && (
      <div className="row">
        <div className="col-md-8">
          <Thumbnail
            cml={structure.cml}
            base64={structure.base64}
            revalidate={structure.revalidateStructure}
            onClickImage={openEditModal}
          />
        </div>
        <div className="col-md-4">
          <Select defaultValue={structure.selectModel} style={{ width: '100%' }} onChange={changeSelectedModel}>
            { structure.models.map(m => <Option key={m.model} value={m.model}>{m.name}</Option>)}
          </Select>
          <div>
            { structure.models.filter(m => m.model === structure.selectModel)[0].description }
          </div>
        </div>
        <Live className="col-md-12">
          <hr />
        </Live>
        <Live className="col-md-12">
          <ButtonBack
            className="btn btn-default"
            onClick={() => history.push(URLS.INDEX)}
          >
            <span className="glyphicon glyphicon-chevron-left" />&nbsp;
            Back</ButtonBack>
          { structure.revalidateStructure ?
            <ButtonContinue
              className="btn btn-danger"
              onClick={() => onRevalidate(structure.cml)}
            >
                  Revalidate&nbsp;
              <span className="glyphicon glyphicon-refresh" />
            </ButtonContinue> :
            <ButtonContinue
              className="btn btn-primary"
              onClick={() => onContinue(structure)}
            >
                  Сontinue&nbsp;
              <span className="glyphicon glyphicon-chevron-right" />
            </ButtonContinue>}
        </Live>
      </div>
    );
  }
}

ValidatePage.propTypes = {
  initPage: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  changeSelectedModel: PropTypes.func.isRequired,
  onRevalidate: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  structure: state.structure,
  request: state.request,
});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: 'INIT_VALIDATE_PAGE' }),
  openEditModal: cml => dispatch({ type: 'EDIT_STRUCTURE_1', cml }),
  changeSelectedModel: value => dispatch(addSelectModel(value)),
  onRevalidate: cml => dispatch({ type: 'REVALIDATE_TASK', cml }),
  onContinue: structure => dispatch({ type: 'CREATE_RESULT_TASK', structure }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePage);
