import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm, Row, Col, Checkbox } from 'antd';
import { ConditionList } from '../../components';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';


class ValidatePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  resultClick() {
    console.log(this.form);
  }

  render() {
    const { resultTask, editStructure, deleteStructure, structure, checkStructure, history } = this.props;
    this.form = [];
    return (
      <div>
        <Row style={{ paddingBottom: 38 }}>
          <Col span={8}>
            <Button icon="left" onClick={() => history.push(URLS.INDEX)}>
                  Back
            </Button>
          </Col>
          <Col span={8} offset={8} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.resultClick.bind(this)} icon="right" disabled={!structure.length}>Show result(s)</Button>
          </Col>
        </Row>

        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={structure}
          renderItem={item => (
            <List.Item>
              <Row gutter={20}>
                <Col lg={12} sm={24} xs={24}><Card
                  style={{ width: '100%' }}
                  cover={<img alt="example" src={item.base64} />}
                  actions={
                    [<Checkbox onChange={checkStructure(item.id)} />,
                      <Icon type="edit" onClick={() => editStructure(item.id)} />,
                      <Popconfirm
                        placement="topLeft"
                        title="Are you sure delete this structure?"
                        onConfirm={() => deleteStructure(item.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Icon type="delete" />
                      </Popconfirm>]}
                />
                </Col>
                <Col lg={12} sm={24} xs={24}>
                  <ConditionList
                    {...item}
                    ref={(e) => { this.form.push(e); }}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />

      </div>
    );
  }
}

ValidatePage.propTypes = {
  initPage: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
  structure: state.structure,
});

const mapDispatchToProps = dispatch => ({
  resultTask: () => null,
  initPage: () => dispatch({ type: 'INIT_VALIDATE_PAGE' }),
  editStructure: () => null,
  deleteStructure: () => null,
  checkStructure: () => null,
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePage);
