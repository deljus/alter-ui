import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Upload, Icon, List, Collapse, Card, Popconfirm  } from 'antd';

const Panel = Collapse.Panel;

const uploadProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
};

const IndexPage = ({structure, editStructure, deleteStructure, drawStructure}) => (
  <div>
    <div>
      <Upload {...uploadProps}>
        <Button icon="upload">
                Upload file
        </Button>
      </Upload>
        <Button type="dashed" onClick={() => drawStructure()} icon="plus">Add structure</Button>
      <Button type="primary" onClick={() => null} icon="right">Validate</Button>
    </div>
    <div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
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
            >
            </Card>
          </List.Item>
        )}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
    structure: state.structure,
});

const mapDispatchToProps = dispatch => ({
    drawStructure: () => dispatch({ type: 'DRAW_STRUCTURE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
