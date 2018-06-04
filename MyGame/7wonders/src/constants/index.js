const DECK_REQUEST = "DECK_REQUEST";
const DECK_RESPONSE = "DECK_RESPONSE";
const CARD_REQUEST = "CARD_REQUEST";
const CARD_RESPONSE = "CARD_RESPONSE";
const ID_RESPONSE = "ID_RESPONSE";
const BOMB_RESPONSE = "BOMB_RESPONSE";
const cardMap = {
  0: "A",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
  7: "8",
  8: "9",
  9: "10",
  10: "J",
  11: "Q",
  12: "K"
};
const suitMap = {
  0: "Club",
  1: "Heart",
  2: "Spade",
  3: "Diamond"
};
export default {
  DECK_REQUEST: DECK_REQUEST,
  DECK_RESPONSE: DECK_RESPONSE,
  CARD_REQUEST: CARD_REQUEST,
  CARD_RESPONSE: CARD_RESPONSE,
  ID_RESPONSE: ID_RESPONSE,
  BOMB_RESPONSE: BOMB_RESPONSE,
  cardMap: cardMap,
  suitMap: suitMap
};
