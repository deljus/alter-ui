import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm, Row, Col, Checkbox } from 'antd';
import { ConditionListView } from '../wrapper';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';


class ValidatePage extends Component {
  componentDidMount() {
    this.props.initPage();
  }

  resultClick() {
    let error = false;
    const params = [];
    const { structure, resultTask } = this.props;

    this.form.forEach((field) => {
      field && field.validateFields((err, values) => {
        if (err) error = true;
        else params.push(values);
      });
    });

    if (error) return;

    const data = structure.map((struct, i) => ({ data: struct.cml, ...params[i] }));
    console.log(params);
    console.log(data);
    // resultTask(data)
  }

  render() {
    const { resultTask, editStructure, deleteStructure, structure, checkStructure, history } = this.props;
    this.form = [];
    return (
      <div>
        <Row style={{ paddingBottom: 38 }}>
          <Col span={8}>
            <Button
              icon="left"
              onClick={() => history.push(URLS.INDEX)}
            >
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
                  <ConditionListView
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
  structure: state.validatePageStructure,
});

const mapDispatchToProps = dispatch => ({
  resultTask: data => dispatch({ type: 'CREATE_RESULT_TASK', data }),
  initPage: () => dispatch({ type: 'INIT_VALIDATE_PAGE' }),
  editStructure: () => null,
  deleteStructure: () => null,
  checkStructure: () => null,
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePage);
