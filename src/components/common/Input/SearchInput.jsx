import React, { Component } from 'react';
import PropTypes from 'prop-types';

const WAIT_INTERVAL = 1000; // In milliseconds
const ENTER_KEY = 13; // Enter keyboard press number

class SearchInput extends Component {
  state = {
    value: '',
  };

  timer = null;

  handleChange = (e) => {
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.setState({ value: e.target.value }, () => this.triggerChange());
      e.preventDefault();
    }
  };

  triggerChange = () => {
    const { value } = this.state;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { type, placeholder, classes } = this.props;
    const { value } = this.state;
    return (
      <input
        type={type}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

SearchInput.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  type: 'text',
  classes: '',
  placeholder: '',
};

export default SearchInput;
