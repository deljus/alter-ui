import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Icon, List, Collapse, Card as BaseCard, Popconfirm, Pagination, Select } from 'antd';
import styled from 'styled-components';
import { showModal } from '../core/actions';
import { SAGA_DELETE_STRUCTURE } from '../core/constants';

const Card = styled(BaseCard)`
    .ant-card-body {
        padding: 0;
        margin: 0;
    }
`;

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

class StructureListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      sorted: 'decrease',
      expand: false,
    };
  }


  onShowSizeChange(current, pageSize) {
    this.setState({ current, pageSize });
  }

  changePage(pageNumber) {
    this.setState({ current: pageNumber });
  }

  changeInput(sorted) {
    this.setState({ sorted });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }

  toggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }


  render() {
    const { structures, editStructure, deleteStructure, settings, form: { getFieldDecorator } } = this.props;
    const { current, pageSize, sorted, expand } = this.state;

    const structuresSorted = structures.sort((a, b) => (sorted === 'increase' ? a.id - b.id : b.id - a.id));
    const gridSettings = settings && settings.grid;

    return structures && settings && (
      <div>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8} style={{ display: expand ? 'block' : 'none' }}>
              <FormItem label="Database">
                {getFieldDecorator('database', {
                  rules: [{
                    required: false,
                  }],
                })(
                  <Select placeholder="placeholder" />,
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{ display: expand ? 'block' : 'none' }}>
              <FormItem label="Table">
                {getFieldDecorator('table', {
                  rules: [{
                    required: false,
                  }],
                })(
                  <Select placeholder="placeholder" />,
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{ display: expand ? 'block' : 'none' }}>
              <FormItem label="Sorting">
                {getFieldDecorator('sorting', {
                  rules: [{
                    required: false,
                  }],
                })(
                  <Select>
                    <Option value="increase">increase</Option>
                    <Option value="decrease">decrease</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: 'right', display: expand ? 'block' : 'none' }}>
              <FormItem>
                <Button type="primary" htmlType="submit">Search</Button>
              </FormItem>
            </Col>
          </Row>
          <Row />
        </Form>
        <Row style={{ marginBottom: '20px', fontSize: '14px' }}>
          <Col span={8}>
            <a style={{ marginLeft: 8 }} onClick={this.toggle}>
              { this.state.expand ? <span> Hide filters <Icon type="up" /></span> : <span> Show filters <Icon type="down" /></span> }
            </a>
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Pagination
              showSizeChanger
              onChange={this.changePage.bind(this)}
              onShowSizeChange={this.onShowSizeChange.bind(this)}
              defaultCurrent={current}
              total={structures.length}
            />
          </Col>
        </Row>
        <List
          grid={{ ...gridSettings, gutter: 20 }}
          dataSource={structuresSorted.slice((current * pageSize) - pageSize, current * pageSize)}
          renderItem={item => (
            <List.Item
              key={item.id}
            >
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
              >
                <div style={{ lineHeight: 2, paddingLeft: 40 }} >Temperature: { item.condition && item.condition.temperature } K</div>
                <div style={{ lineHeight: 2, paddingLeft: 40 }} >Pressure: { item.condition && item.condition.pressure } atm</div>
                <Collapse bordered={false} style={{ height: 50, padding: 0, margin: 0 }}>
                  <Panel header="Parameters" key="1" style={{ position: 'absolute', width: '100%', background: 'white', zIndex: 1, border: '1px solid gray' }}>
                    <div>
                      {item.params && item.params.map((param, i) => <div key={i}>{param.key} : {param.value}</div>)}
                    </div>
                  </Panel>
                </Collapse>
              </Card>
            </List.Item>
          )}
        />
      </div>

    );
  }
}

StructureListPage.propTypes = {
  editStructure: PropTypes.func.isRequired,
  deleteStructure: PropTypes.func.isRequired,
  structures: PropTypes.array,
};


const mapStateToProps = state => ({
  structures: state.structures,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  editStructure: id => dispatch(showModal(true, id)),
  deleteStructure: id => dispatch({ type: SAGA_DELETE_STRUCTURE, id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StructureListPage));
