const straightCard = new Array(13).fill(0).map((val, index) => index);
const deck = [
  JSON.parse(JSON.stringify(straightCard)),
  JSON.parse(JSON.stringify(straightCard)),
  JSON.parse(JSON.stringify(straightCard)),
  JSON.parse(JSON.stringify(straightCard))
];
module.exports = deck;
