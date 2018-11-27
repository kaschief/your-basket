import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { GoTrashcan } from 'react-icons/go';

export default class Table extends Component {
  render() {
    return (
      <div className="table">
        <table>
          <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead className="table-head">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Cost</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.props.basket.map((product, i) => {
              return (
                <tr key={i}>
                  <td>{product.product}</td>
                  <td>£{product.price}</td>
                  <td>
                    <Row>
                      <Col xs="6">
                        <input
                          type="text"
                          name={product.product}
                          placeholder={product.quantity}
                          value={product.quantity}
                          onChange={this.props.change}
                        />
                      </Col>
                      <Col className="the-container" xs="6">
                        <button onClick={e => this.props.add(product)}>
                          +
                        </button>
                        <button onClick={e => this.props.subtract(product)}>
                          -
                        </button>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    £{Math.round(product.quantity * product.price * 100) / 100}
                  </td>
                  <td>
                    <GoTrashcan onClick={e => this.props.remove(product)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
