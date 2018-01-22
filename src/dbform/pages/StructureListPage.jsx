import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../core/actions';

import 'antd/lib/icon/style/css';
import 'antd/lib/list/style/css';
import 'antd/lib/collapse/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/popconfirm/style/css';

import { List, Icon, Collapse, Card, Popconfirm } from 'antd';

const Panel = Collapse.Panel;

class StructureListPage extends Component {
  render() {
    const { structures, editStructure, deleteStructure, settings } = this.props;
    const gridSettings = settings && settings.grid;
    return (
      <List
        grid={{ ...gridSettings }}
        dataSource={structures}
        renderItem={item => (
          <List.Item>
            <Card
              style={{ width: 300 }}
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
