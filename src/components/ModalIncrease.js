import React, { Component } from 'react';
import { Modal } from 'antd';
import 'antd/lib/modal/style/css';

class ModalIncrease extends Component {
    state = {
      base64: '',
      visible: false,
      confirmLoading: false,
    }
    showModal = (base64) => {
      this.setState({
        visible: true,
        base64,
      });
    }
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }
    render() {
      const { visible, confirmLoading, base64 } = this.state;
      return (
        <div>
          <Modal
            visible={visible}
            width={800}
            footer={false}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <img src={base64} style={{ width: '100%' }} />
          </Modal>
        </div>
      );
    }
}

export default ModalIncrease;
