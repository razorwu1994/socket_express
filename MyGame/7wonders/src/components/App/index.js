import React, { Component } from "react";
import "./styles.css";

import { Button, Row, Col } from "react-bootstrap";
import { cardSum } from "../../utils";
import socketIOClient from "socket.io-client";
import CONSTANTS from "../../constants";
import Card from "../../components/Card";
import DeckArea from "../../components/DeckArea";
import ButtonArea from "../../components/ButtonArea";
const socket = socketIOClient("http://192.168.1.5:4001");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {},
      cards: [],
      opponent: [],
      id: "",
      lose: false,
      sum: 0,
      opponentSum: 0
    };
  }

  componentDidMount() {
    socket.on(CONSTANTS.ID_RESPONSE, id => {
      if (this.state.id.length == 0) {
        this.setState({ id });
      }
    });
    socket.on(CONSTANTS.DECK_RESPONSE, deck => {
      this.setState({ deck });
    });
    socket.on(CONSTANTS.CARD_RESPONSE, users => {
      let sum = cardSum(users[this.state.id].cards);
      let opponent =
        users[Object.keys(users).filter(key => key !== this.state.id)[0]].cards;
      let opponentSum = cardSum(opponent);
      this.setState({
        cards: users[this.state.id].cards,
        sum,
        opponent,
        opponentSum
      });
    });

    socket.on(CONSTANTS.BOMB_RESPONSE, obj => {
      if (obj.id == this.state.id) {
        let cards = this.state.cards;
        cards.push(obj.card);
        this.setState({ lose: true, cards: cards });
      }
    });
  }

  socketEmit = SIGNAL => {
    socket.emit(SIGNAL, this.state.id);
  };

  render() {
    let id = this.state.id;

    return id.length !== 0 ? (
      <div className="App">
        <DeckArea>
          <h3>
            {this.state.opponentSum > 21
              ? "Greater than 21"
              : `Sum ${this.state.opponentSum}`}
          </h3>
          {this.state.opponent.length === 0 && <Card />}
          {this.state.opponent.map(card => (
            <Col sm={6} md={4} lg={1}>
              <Card suit={card.suit} value={card.number} />
            </Col>
          ))}
        </DeckArea>
        <li>a</li>
        <ButtonArea>
          <button onClick={() => this.socketEmit(CONSTANTS.DECK_REQUEST)}>
            GET DECK
          </button>
          <button
            onClick={() => this.socketEmit(CONSTANTS.CARD_REQUEST)}
            disabled={this.state.lose}
          >
            GET CARD
          </button>
          <button onClick={() => this.socketEmit(CONSTANTS.FINISH_REQUEST)}>
            Ready
          </button>
        </ButtonArea>
        <DeckArea yourDeck>
          <h3>
            {this.state.sum > 21 ? "Greater than 21" : `Sum ${this.state.sum}`}
          </h3>
          {this.state.cards.length === 0 && <Card />}
          {this.state.cards.map(card => (
            <Col sm={6} md={4} lg={1}>
              <Card suit={card.suit} value={card.number} />
            </Col>
          ))}
        </DeckArea>
      </div>
    ) : (
      <div>The room is full</div>
    );
  }
}

export default App;
