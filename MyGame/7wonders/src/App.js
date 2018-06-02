import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { auth, fb } from "./config/firebase";
import Wonder from "./components/Wonder";
import Gamble from "./components/Gamble";
import { Button } from "react-bootstrap";

import Circus from "./img/Circus.png";
import Piraeus from "./img/Piraeus.png";
import TheAppianWay from "./img/TheAppianWay.png";
import TheColossus from "./img/TheColossus.png";
import TheGreatLibrary from "./img/TheGreatLibrary.png";
import TheGreatLighthouse from "./img/TheGreatLighthouse.png";
import TheHangingGardens from "./img/TheHangingGardens.png";
import TheMausoleum from "./img/TheMausoleum.png";
import ThePyramids from "./img/ThePyramids.png";
import TheSphinx from "./img/TheSphinx.png";
import TheStatOfZeus from "./img/TheStatOfZeus.png";
import TheTempleOfArtemis from "./img/TheTempleOfArtemis.png";

import { randomInt } from "./util/random";
import socketIOClient from "socket.io-client";
import CONSTANTS from "./constants";
const ImageMap = {
  "Circus Maximus": Circus,
  Piraeus: Piraeus,
  "The Appian Way": TheAppianWay,
  "The Colossus": TheColossus,
  "The Great Library": TheGreatLibrary,
  "The Great Lighthouse": TheGreatLighthouse,
  "The Hanging Gardens": TheHangingGardens,
  "The Mausoleum": TheMausoleum,
  "The Pyramids": ThePyramids,
  "The Sphinx": TheSphinx,
  "The Statue of Zeus": TheStatOfZeus,
  "The Temple Of Artemis": TheTempleOfArtemis
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstArr: [],
      SecondArr: [],
      showModal: new Array(8).fill(false),
      number: -1,
      wonderData: { user: [-1, -1, -1, -1], ai: [-1, -1, -1, -1] },
      endpoint: "http://192.168.1.5:4001",
      color: "white"
    };
  }
  // adding the function
  setColor = color => {
    this.setState({ color });
  };
  componentDidMount() {
    let Data = fb.database().ref("Cards");
    let tempState;
    Data.on("value", snapshot => {
      let cards = snapshot.val();
      // console.log(cards.Wonders);
      tempState = {
        age1: cards.AGE1,
        age2: cards.AGE2,
        age3: cards.AGE3,
        wonder: cards.Wonders,
        wonderRound: 1
      };
      this.setState(tempState);
      this.wonderStage();
    });
  }

  gamble = () => {
    let temp = randomInt(2);
    let wonderData = this.state.wonderData;
    if (temp === 1) {
      wonderData.ai[0] = randomInt(4); //0，1，2，3
    }
    this.setState({ number: temp, wonderData });
  };
  wonderAI = () => {
    let wonderData = this.state.wonderData;
    while (true) {
      let randomINT = randomInt(4);
      if (this.state.wonderData.user.indexOf(randomINT) === -1) {
        wonderData.ai[wonderData.ai.indexOf(-1)] = randomINT;
        break;
      }
    }
    this.setState({ wonderData });
  };
  wonderStage = () => {
    if (this.state.wonder != null) {
      let WonderArr = Object.keys(this.state.wonder);
      let FirstArr = [],
        SecondArr = [];
      while (FirstArr.length < 4) {
        var randomnumber = Math.floor(Math.random() * WonderArr.length);
        if (FirstArr.indexOf(randomnumber) > -1) continue;
        FirstArr[FirstArr.length] = randomnumber;
      }
      while (SecondArr.length < 4) {
        var randomnumber = Math.floor(Math.random() * WonderArr.length);
        if (
          SecondArr.indexOf(randomnumber) > -1 ||
          FirstArr.indexOf(randomnumber) > -1
        )
          continue;
        SecondArr[SecondArr.length] = randomnumber;
      }
      FirstArr = FirstArr.sort();
      SecondArr = SecondArr.sort();
      this.setState({ FirstArr, SecondArr });
    }
  };
  selectWonder = name => {
    let wonderData = this.state.wonderData;
    let user = wonderData.user;
    wonderData[name] = this.state.wonder[name];
    let index =
      this.state.wonderRound === 1
        ? this.state.FirstArr.indexOf(
            Object.keys(this.state.wonder).indexOf(name)
          )
        : this.state.SecondArr.indexOf(
            Object.keys(this.state.wonder).indexOf(name)
          );
    user[user.indexOf(-1)] = index;
    let tempState = this.state.showModal;
    tempState[index] = false;
    this.setState({ showModal: tempState, wonderData });
  };
  age1Stage = () => {};
  age2Stage = () => {};
  age3Stage = () => {};

  showModal = index => {
    let tempState = this.state.showModal;
    tempState[index] = true;
    this.setState({ showModal: tempState });
  };
  hideModal = index => {
    let tempState = this.state.showModal;
    tempState[index] = false;
    this.setState({ showModal: tempState });
  };

  // method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.

    socket.emit("change color", "red");
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  };
  render() {
    const socket = socketIOClient(this.state.endpoint);

    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument
    socket.on("change color", color => {
      // setting the color of our button
      document.body.style.backgroundColor = color;
    });

    let wonderData = { ai: [] };
    var FirstIMGArr = [],
      SecondIMGArr = [];
    if (this.state.wonder != null) {
      let WonderArr = Object.keys(this.state.wonder);
      for (let i of this.state.FirstArr) {
        FirstIMGArr.push(ImageMap[WonderArr[i]]);
      }
      for (let i of this.state.SecondArr) {
        SecondIMGArr.push(ImageMap[WonderArr[i]]);
      }
      wonderData = this.state.wonderData;
    }
    const WonderStage = (
      <div>
        <button onClick={() => this.send()}>Change Color</button>

        {this.state.wonderRound === 1 ? (
          <Wonder
            user={wonderData.user}
            ai={wonderData.ai}
            showModal={this.showModal}
            hideModal={this.hideModal}
            selectModal={this.state.showModal}
            selectWonder={this.selectWonder}
            image={FirstIMGArr}
            idArr={this.state.FirstArr.map(
              i => Object.keys(this.state.wonder)[i]
            )}
          />
        ) : (
          <Wonder
            user={wonderData.user}
            ai={wonderData.ai}
            showModal={this.showModal}
            hideModal={this.hideModal}
            selectModal={this.state.showModal}
            selectWonder={this.selectWonder}
            image={SecondIMGArr}
            idArr={this.state.SecondArr.map(
              i => Object.keys(this.state.wonder)[i]
            )}
          />
        )}
        <Button
          bsStyle="info"
          onClick={() => {
            let wonderData = this.state.wonderData;
            wonderData.user = [-1, -1, -1, -1];
            wonderData.ai = [-1, -1, -1, -1];
            this.setState({
              wonderRound: this.state.wonderRound + 1,
              wonderData
            });
          }}
          disabled={this.state.wonderRound === 2}
        >
          下一回合
        </Button>
      </div>
    );

    return (
      <div className="App">
        欢迎来到七大奇迹
        {this.state.number === -1 ? (
          <Gamble gamble={this.gamble} number={this.state.number} />
        ) : (
          <span />
        )}
        {this.state.number !== -1 && WonderStage}
      </div>
    );
  }
}

export default App;
