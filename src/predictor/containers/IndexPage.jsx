import React from 'react';
import { connect } from 'react-redux';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm, Row, Col } from 'antd';
import { deleteStructureIndex } from '../core/actions';
import { modal } from '../../base/actions';


const Panel = Collapse.Panel;

const uploadProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
};

const IndexPage = ({ structure, editStructure, deleteStructure, drawStructure, createTask }) => (
  <div>
    <Row gutter={24} style={{ marginBottom: '20px' }}>
      <Col span={8}>
        <Upload {...uploadProps}>
          <Button icon="upload">
                Upload filebgsrbsrgb
            wefwefwef
          </Button>
        </Upload>
      </Col>
      <Col offset={8} style={{ textAlign: 'right' }}>
        <Button type="dashed" onClick={() => drawStructure()} icon="plus" style={{ marginRight: '8px' }}>Add structure</Button>
        <Button type="primary" onClick={() => createTask(structure)} icon="right" disabled={!structure.length}>Validate</Button>
      </Col>
    </Row>
    <div>
      <List
        grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
        dataSource={structure}
        renderItem={item => (
          <List.Item>
            <Card
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

const mapStateToProps = state => ({
  structure: state.indexPageStructure,
});

const mapDispatchToProps = dispatch => ({
  drawStructure: () => dispatch({ type: 'DRAW_STRUCTURE' }),
  deleteStructure: id => dispatch(deleteStructureIndex(id)),
  editStructure: id => dispatch(modal(true, 'EDIT_STRUCTURE_INDEX', id)),
  createTask: structure => dispatch({ type: 'CREATE_TASK_INDEX', structure }),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
