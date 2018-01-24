import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm, Row, Col } from 'antd';
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
    return (
      <div>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Button icon="left">
                  Back
            </Button>
          </Col>
          <Col span={8} offset={8} style={{ textAlign: 'right' }}>
            <Button type="dashed" onClick={() => drawStructure()} icon="plus" style={{ marginRight: '8px' }}>Add structure</Button>
            <Button type="primary" onClick={() => createTask(structure)} icon="right" disabled={!structure.length}>Show result(s)</Button>
          </Col>
        </Row>
        <div>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
            dataSource={structure}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{ width: '100%' }}
                  cover={<img alt="example" src={item.base64} />}
                  actions={
                    [<Icon type="edit" onClick={() => editStructure(item.id)} />,
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

});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: 'INIT_VALIDATE_PAGE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePage);
