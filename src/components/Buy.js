import React, { Component } from 'react';

export default class Buy extends Component {
  render() {
    return (
      <div className="buy-now">
        <button onClick={this.props.order}>Buy Now >></button>
      </div>
    );
  }
}
