import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Button, Row, Col } from 'antd';
import { Thumbnail } from '../../components';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';

const Option = Select.Option;

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
      <div>
        <Row>
          <Col span={14} style={{ padding: 10 }}>
            <Thumbnail
              cml={structure.cml}
              base64={structure.base64}
              revalidate={structure.revalidateStructure}
              onClickImage={openEditModal}
            />
          </Col>
          <Col span={10} style={{ padding: 10 }}>
            <b>Selected model:</b>
            <Select defaultValue={structure.selectModel} style={{ width: '100%', paddingBottom: 10 }} onChange={changeSelectedModel}>
              { structure.models.map(m => <Option key={m.model} value={m.model}>{m.name}</Option>)}
            </Select>
            <b>Description:</b>
            <div>
              { structure.models.filter(m => m.model === structure.selectModel)[0].description }
            </div>
          </Col>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row>
          <Col span={8}>
            <Button
              onClick={() => history.push(URLS.INDEX)}
              icon="left"
            >Back</Button>
          </Col>
          <Col span={8} offset={8} style={{ textAlign: 'right' }}>
            { structure.revalidateStructure ?
              <Button
                icon="sync"
                type="danger"
                onClick={() => onRevalidate(structure.cml)}
              >
                  Revalidate
              </Button> :
              <Button
                type="primary"
                icon="right"
                onClick={() => onContinue(structure)}
              >
                  Сontinue
              </Button>}
          </Col>
        </Row>
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
