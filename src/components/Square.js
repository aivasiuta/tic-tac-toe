import React from 'react';

export default class extends React.Component {

  render() {
    const {value, onClick} = this.props;
    return (
      <button
        className="square"
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
}