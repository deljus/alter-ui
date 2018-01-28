import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Input, Row, Col } from 'antd';
import { textToCml } from '../base/marvinAPI';
import history from '../base/history';

const InputGroup = Input.Group;

message.config({
  top: 100,
  duration: 2,
});

class SearchInput extends Component {
  state = {
    inputText: '',
  };

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }

  submitForm() {
    const { inputText } = this.state;
    inputText && textToCml(inputText)
      .then((cml) => { this.props.onSearchFormSubmit(cml); })
      .catch(() => message.error('Structure not found'));
  }
  render() {
    const { drawStructure, buttonURL } = this.props;
    const { inputText } = this.state;

    return (
      <Row>
        <Col span={20} offset={2}>
          <InputGroup
            style={{ width: '100%', paddingTop: 50 }}
            compact
            size="large"
          >
            <Input
              style={{ width: '60%' }}
              placeholder="input search text"
              value={inputText}
              onPressEnter={this.submitForm.bind(this)}
              onChange={this.handleChange.bind(this)}
            />
            <Button
              icon="form"
              size="large"
              onClick={() => drawStructure()}
            >
                Draw
            </Button>
            <Button
              icon="search"
              type="primary"
              size="large"
              onClick={this.submitForm.bind(this)}
            >
                Search
            </Button>
          </InputGroup>
          <div style={{ textAlign: 'left', paddingTop: 5 }}>
            {buttonURL && buttonURL.map(link =>
              <Button type="dashed" onClick={() => history.push(link.url)}>{link.name}</Button>,
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

SearchInput.propTypes = {
  drawStructure: PropTypes.func.isRequired,
  onSearchFormSubmit: PropTypes.func.isRequired,
  buttonURL: PropTypes.arrayOf(PropTypes.object),
};

SearchInput.defaultProps = {
  buttonURL: null,
};

export default SearchInput;
