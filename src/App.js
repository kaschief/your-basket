import React, { Component } from 'react';
import Table from '../src/components/Table';
import Buy from '../src/components/Buy';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [
        {
          product: 'Cotton T-Shirt, Medium',
          price: 1.99,
          quantity: 1
        },
        {
          product: 'Baseball Cap, One Size',
          price: 2.99,
          quantity: 2
        },
        {
          product: 'Swim Shorts, Medium',
          price: 3.99,
          quantity: 1
        }
      ]
    };
  }

  inputHandle = event => {
    let newQty;

    if (event.target.value <= 10 && event.target.value >= 0) {
      newQty = Math.floor(event.target.value);

      let newBasket = this.state.basket.slice();

      let theProduct = newBasket.find(e => {
        return e.product === event.target.name;
      });

      let theIndex = newBasket.indexOf(theProduct);

      newBasket[theIndex].quantity = newQty;

      this.setState({
        basket: newBasket
      });
    }
  };

  incrementHandle = product => {
    let newBasket = this.state.basket.slice();

    let theIndex = newBasket.indexOf(product);

    if (newBasket[theIndex].quantity < 10) {
      newBasket[theIndex].quantity++;
      this.setState({
        basket: newBasket
      });
    }
  };

  decrementHandle = product => {
    let newBasket = this.state.basket.slice();

    let theIndex = newBasket.indexOf(product);

    if (newBasket[theIndex].quantity >= 2) {
      newBasket[theIndex].quantity--;
      this.setState({
        basket: newBasket
      });
    }
  };

  handleDelete = name => {
    let newBasket = this.state.basket.slice();

    let theProduct = newBasket.find(e => {
      return e.product === name.product;
    });

    let theIndex = newBasket.indexOf(theProduct);

    if (theIndex > -1) {
      newBasket.splice(theIndex, 1);
      this.setState({
        basket: newBasket
      });
    }
  };

  orderHandle = () => {
    console.log('ordered');

    const newPurchase = this.state.basket;

    axios.post(`APIurl`, { newPurchase }).then(res => {
      console.log(res);
    });

    localStorage.setItem('newPurchase', JSON.stringify(newPurchase));

    let retreivedObject = JSON.parse(localStorage.getItem('newPurchase'));

    let newWindow = window.open('url', '_blank');
    newWindow.alert(retreivedObject);
  };

  render() {
    let subtotal, taxes, total;

    this.state.basket.length > 0
      ? (subtotal =
          Math.round(
            this.state.basket
              .map(e => {
                return e.price * e.quantity;
              })
              .reduce((cur, acc) => cur + acc) * 100
          ) / 100)
      : (subtotal = 0);

    this.state.basket.length > 0
      ? (taxes = Math.round(subtotal * 0.2 * 100) / 100)
      : (taxes = 0);

    this.state.basket.length > 0
      ? (total = Math.round((subtotal + taxes) * 100) / 100)
      : (total = 0);

    return (
      <div className="App">
        <Container>
          <div className="header">
            <h1>AKQA</h1>
            <h3>Your Basket</h3>
            <Row>
              <Col>
                <p>Items you have added to your basket are shown below. </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Adjust the quantities or remove items before continuing your
                  purchase.
                </p>{' '}
              </Col>
            </Row>
          </div>
          <Table
            basket={this.state.basket}
            change={this.inputHandle}
            remove={this.handleDelete}
            add={this.incrementHandle}
            subtract={this.decrementHandle}
          />
          <Row>
            <Col>
              <h5>Subtotal:</h5>
            </Col>
            <Col>
              <h5>£{subtotal}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>VAT @ 20%: </h5>
            </Col>
            <Col>
              <h5>£{taxes}</h5>
            </Col>
          </Row>
          <div>
            <Row>
              <Col>
                <h5>Total Cost:</h5>
              </Col>
              <Col>
                <h5>£{total}</h5>
              </Col>
            </Row>
          </div>

          {this.state.basket.length ? <Buy order={this.orderHandle} /> : null}
        </Container>
      </div>
    );
  }
}

export default App;
