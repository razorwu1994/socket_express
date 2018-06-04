const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const CONSTANTS = require("./constants");
const utils = require("./utils");

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

var connectedClient = 0;
var users = {};
var currentConnection = 0;
// This is what the socket.io syntax is like, we will work this later
io.on("connection", socket => {
  var user = {
    cards: []
  };
  var game_deck = CONSTANTS.GAME_DECK;
  console.log("New client connected");
  currentConnection++;
  if (currentConnection > CONSTANTS.MAX_CONNECTION) {
    socket.disconnect();
    console.log("excess max connection");
  }
  let id = socket.id;
  io.sockets.emit(CONSTANTS.ID_RESPONSE, id);

  users[id] = user;

  socket.on(CONSTANTS.DECK_REQUEST, () => {
    io.sockets.emit(CONSTANTS.DECK_RESPONSE, CONSTANTS.GAME_DECK);
  });

  socket.on(CONSTANTS.CARD_REQUEST, id => {
    console.log(users);
    let suit = utils.randomInt(4);
    let number = utils.randomInt(13) % game_deck[suit].length;
    let card = { suit: suit, number: number };
    let cards = users[id].cards;
    cards.push(card);
    if (!utils.check21(cards)) {
      delete game_deck[suit][number];
      io.sockets.emit(CONSTANTS.CARD_RESPONSE, users);
    } else {
      console.log("bomb");
      io.sockets.emit(CONSTANTS.BOMB_RESPONSE, { id: id, card: card });
    }
    // console.log("\nCurrent users info ", JSON.stringify(users));
  });
  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    currentConnection--;
    console.log(socket.id, "user disconnected");
    delete users[socket.id];
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
