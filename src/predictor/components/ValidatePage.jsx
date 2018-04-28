import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Icon, List, Card, Popconfirm, Row, Col, Checkbox } from 'antd';
import { modal, addSelectModel, chekedStructure } from '../core/actions';
import { MODAL, URLS } from '../../config';
import {
  SAGA_CREATE_RESULT_TASK,
  SAGA_INIT_VALIDATE_PAGE,
} from '../core/constants';
import { ConditionList } from '../../components';
import { getValidateStructure } from '../core/selectors';


class ValidatePage extends Component {
  componentDidMount() {
    this.props.initPage();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  render() {
    const { resultTask, editStructure, deleteStructure, structure, checkStructure, history, form } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
      >
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
            <Button
              type="primary"
              htmlType="submit"
              icon="right"
            >
              Show result(s)
            </Button>
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
                    [<Checkbox cheked={item.check} onChange={() => checkStructure(item.id)} />,
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
                    formComponent={Form}
                    form={form}
                    {...item}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />

      </Form>
    );
  }
}

ValidatePage.propTypes = {
  initPage: PropTypes.func.isRequired,
};

ValidatePage.defaultProps = {

};

const mapStateToProps = state => ({
  structure: getValidateStructure(state),
});

const mapDispatchToProps = dispatch => ({
  resultTask: data => dispatch({ type: SAGA_CREATE_RESULT_TASK, data }),
  initPage: () => dispatch({ type: SAGA_INIT_VALIDATE_PAGE }),
  editStructure: () => null,
  deleteStructure: () => null,
  checkStructure: id => dispatch(chekedStructure(id)),
});

const ValidatePageForm = Form.create()(ValidatePage);

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePageForm);
