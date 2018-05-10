import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Icon, List, Card, Popconfirm, Row, Col, Checkbox, Dropdown, Menu } from 'antd';
import { modal } from '../../base/actions';
import { MODAL, URLS } from '../../config';
import {
  SAGA_CREATE_RESULT_TASK,
  SAGA_INIT_VALIDATE_PAGE,
  SAGA_EDIT_STRUCTURE_VALIDATE,
} from '../core/constants';
import { ConditionList } from '../../components';
import { getValidateStructure } from '../core/selectors';
import ConditionListModal from './ConditionListModal';


class ValidatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revalidate: true,
      checkedIds: [],
      visibleModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkStructure = this.checkStructure.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setStructureFields = this.setStructureFields.bind(this);
  }

  componentDidMount() {
    this.props.initPage();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, createResult, structures } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const models = structures.map(s => ({
          structure: s.structure,
          ...Object.keys(values)
            .reduce((acc, key) => {
              const elem = key.split('-');
              if (elem[0] === 'models') {
                acc[elem[0]] = values[key].map(model => ({ model }));
              } else {
                acc[elem[0]] = values[key];
              }

              return acc;
            }, {}),
        }));
        createResult(models);
      }
    });
  }

  checkStructure(e, id, type) {
    let { checkedIds } = this.state;
    if (e.target.checked) {
      checkedIds.push({ id, type });
    } else {
      checkedIds = checkedIds.filter(item => item.id !== id);
    }
    this.setState({ checkedIds });
  }

  handleMenuClick(e) {
    const { deleteStructure } = this.props;
    const { checkedIds } = this.state;
    switch (e.key) {
      case '1':
        deleteStructure(checkedIds);
        break;
      case '2':
        this.setState({ visibleModal: true });
        break;
    }
  }

  closeModal() {
    this.setState({ visibleModal: false });
  }

  setStructureFields(values) {
    const { typeModel, ...fields } = values;
    const { checkedIds } = this.state;

    //checkedIds.forEach()

  }

  render() {
    const {
      resultTask,
      editStructure,
      deleteStructure,
      structures,
      checkStructure,
      history,
      form } = this.props;

    const { revalidate, checkedIds, visibleModal } = this.state;

    console.log(checkedIds);

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Delete</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">Edit conditions</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <ConditionListModal
          visible={visibleModal}
          onOk={this.setStructureFields}
          onCancel={this.closeModal}
        />
        <Form
          onSubmit={this.handleSubmit}
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
              <Dropdown
                overlay={menu}
                disabled={!checkedIds.length}
              >
                <Button style={{ marginRight: '10px' }} >
                Actions <Icon type="down" />
                </Button>
              </Dropdown>
              { revalidate ?
                <Button
                  type="primary"
                  htmlType="submit"
                  icon="right"
                >
              Show result(s)
                </Button> :
                <Button
                  type="primary"
                  htmlType="submit"
                  icon="right"
                >
                Revalidate
                </Button>
              }
            </Col>
          </Row>

          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={structures}
            renderItem={item => (
              <List.Item>
                <Row gutter={20}>
                  <Col lg={12} sm={24} xs={24}>
                    <Card
                      style={{ width: '100%' }}
                      cover={<img alt="no image" src={item.base64} />}
                      actions={
                        [<Checkbox onChange={e => this.checkStructure(e, item.structure, item.type)} />,
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
                <hr />
              </List.Item>
            )}
          />

        </Form>
      </div>
    );
  }
}

ValidatePage.propTypes = {
  initPage: PropTypes.func.isRequired,
};

ValidatePage.defaultProps = {

};

const mapStateToProps = state => ({
  structures: getValidateStructure(state),
});

const mapDispatchToProps = dispatch => ({
  createResult: data => dispatch({ type: SAGA_CREATE_RESULT_TASK, data }),
  initPage: () => dispatch({ type: SAGA_INIT_VALIDATE_PAGE }),
  editStructure: id => dispatch(modal(true, SAGA_EDIT_STRUCTURE_VALIDATE, id)),
  deleteStructure: id => null,
  checkStructure: id => null,
});

const ValidatePageForm = Form.create()(ValidatePage);

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePageForm);
