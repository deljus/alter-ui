import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'antd/lib/icon/style/css';
import 'antd/lib/list/style/css';
import 'antd/lib/collapse/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/popconfirm/style/css';

import { List, Icon, Collapse, Card, Popconfirm } from 'antd';

const Panel = Collapse.Panel;

class StructureListPage extends Component {
  componentDidMount() {
    this.props.initPage();
  }

  render() {
    const { structures, editStructure, deleteStructure } = this.props;
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
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
                  {item.params.map(param => <div>{param.key} : {param.value}</div>)}
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
});

const mapDispatchToProps = dispatch => ({
  initPage: () => dispatch({ type: 'INIT_STRUCTURE_LIST_PAGE' }),
  editStructure: id => null,
  deleteStructure: id => dispatch({ type: 'DELETE_STRUCTURE', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StructureListPage);
