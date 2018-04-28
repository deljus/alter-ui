import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import SliderInput from './SliderInput';

const Option = Select.Option;

class SlidersSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: [] };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
  }

  handleBlur(val) {
    const { data } = this.props;
    this.setState({ selected: [] });
    if (val.length) {
      const persent = +(100 / val.length).toFixed(1);
      const lastPersent = +(persent + (100 - (val.length * persent))).toFixed(1);
      this.setState({ selected: val.map((dt, id) => {
        const name = data.filter(n => n.additive === dt)[0].name;

        if (id < data.length - 1) {
          return { value: persent, additive: dt, name };
        }
        return { value: lastPersent, additive: dt, name };
      }),
      });
    }
  }

  handleSlide(value, item) {
    const { selected } = this.state;
    const sum = selected.reduce((last, it) => last + it.value, 0);
    console.log(sum);
    if (sum <= 100) {
      this.props.onChange({ ...this.state, selected: { ...item, value } });
      this.setState({ selected: selected.map((sel) => {
        if (sel.additive === item.additive) {
          return { ...item, value };
        }
        return sel;
      }),
      });
    }
  }

  render() {
    const { data, onChange } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onBlur={this.handleBlur}
        >
          {data.map((item, i) => <Option key={item.additive + i} value={item.additive}>{item.name}</Option>)}
        </Select>
        { selected.map((item, i) => (
          <div><h1>{ item.name }</h1>
            <SliderInput value={item.value} onChange={e => this.handleSlide(e, item)} />
          </div>
        ))}
      </div>
    );
  }
}

SlidersSelect.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

SlidersSelect.defaultProps = {
  data: [],
};


export default SlidersSelect;
