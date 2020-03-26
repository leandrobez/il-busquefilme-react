import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        value: ''
      }
    };
  }
  componentDidMount = () => {
    this.setState({
      message: this.props.message
    });
  };
  render() {
    return (
      <div
        className={'il-alert il-alert--' + this.state.message.type + ' move'}
      >
        <p>{this.state.message.value}</p>
      </div>
    );
  }
}

export default Alert;
