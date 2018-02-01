import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Icon, Collapse, Card as BaseCard, Popconfirm, Pagination, Select } from 'antd';
import styled from 'styled-components';
import { showModal } from '../core/actions';

const Card = styled(BaseCard)`
    .ant-card-body {
        padding: 0;
        margin: 0;
    }
`;

const Panel = Collapse.Panel;

const Option = Select.Option;

class StructureListPage extends Component {
    state = {
      current: 1,
      pageSize: 10,
      sorted: 'decrease',
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
      return structures && settings && (
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
  deleteStructure: id => dispatch({ type: 'DELETE_STRUCTURE', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StructureListPage);
