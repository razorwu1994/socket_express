export const randomInt = upper => Math.floor(Math.random() * upper);
export const cardSum = array => array.reduce((a, b) => a + b.number + 1, 0);
