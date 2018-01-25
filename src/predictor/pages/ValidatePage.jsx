import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm, Row, Col, Checkbox } from 'antd';
import { Thumbnail } from '../../components';
import { modal, addSelectModel } from '../core/actions';
import { MODAL, URLS } from '../../config';


class ValidatePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initPage();
  }

  render() {
    const { resultTask, editStructure, deleteStructure, structure, checkStructure, history } = this.props;
    return (
      <div>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Button icon="left" onClick={() => history.push(URLS.INDEX)}>
                  Back
            </Button>
          </Col>
          <Col span={8} offset={8} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={() => resultTask(structure)} icon="right" disabled={!structure.length}>Show result(s)</Button>
          </Col>
        </Row>
        <div>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 2, xl: 2 }}
            dataSource={structure}
            renderItem={item => (
              <List.Item>
                <Card
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
              </List.Item>
            )}
          />
        </div>
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
