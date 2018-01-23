import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination, Select, Col } from 'antd';
import { showModal } from '../core/actions';

import 'antd/lib/icon/style/css';
import 'antd/lib/list/style/css';
import 'antd/lib/collapse/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/popconfirm/style/css';
import 'antd/lib/select/style/css';

import { List, Icon, Collapse, Card, Popconfirm } from 'antd';

const Panel = Collapse.Panel;
const Option = Select.Option;

class StructureListPage extends Component {
    state = {
      current: 1,
      pageSize: 10,
      sorted: 'increase',
    };
    onShowSizeChange(current, pageSize) {
      this.setState({ current, pageSize });
    }
    changePage(pageNumber) {
      this.setState({ current: pageNumber });
    }
    changeInput(sorted) {
      this.setState({ sorted });
    }
    render() {
      const { structures, editStructure, deleteStructure, settings } = this.props;
      const { current, pageSize, sorted } = this.state;

      const structuresSorted = structures.sort((a, b) => (sorted === 'increase' ? a.id - b.id : b.id - a.id));

      const gridSettings = settings && settings.grid;
      return (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span>Sorting:</span>
            <Select
              defaultValue={sorted}
              style={{ width: 120 }}
              onChange={this.changeInput.bind(this)}
            >
              <Option value="increase">increase</Option>
              <Option value="decrease">decrease</Option>
            </Select>
            <Pagination
              className="pull-right"
              showSizeChanger
              onChange={this.changePage.bind(this)}
              onShowSizeChange={this.onShowSizeChange.bind(this)}
              defaultCurrent={current}
              total={structures.length}
            />
          </div>
          <List
            grid={{ ...gridSettings }}
            dataSource={structuresSorted.slice((current * pageSize) - pageSize, current * pageSize)}
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
                >
                  <Collapse bordered={false}>
                    <Panel header="Parameters" key="1">
                      {item.params && item.params.map(param => <div>{param.key} : {param.value}</div>)}
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
  initPage: PropTypes.func.isRequired,
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
  deleteStructure: id => dispatch({ type: 'DELETE_STRUCTURE', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StructureListPage);
