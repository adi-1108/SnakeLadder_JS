export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomStarGates = (numPairs) => {
  const obj = {};
  for (let i = 0; i < numPairs; i++) {
    let key = randomInRange(5, 80);
    let value = randomInRange(key + 10, 100);
    obj[key] = value;
  }
  return obj;
};

export const generateRandomBlackHoles = (numPairs) => {
  const obj = {};
  for (let i = 0; i < numPairs; i++) {
    let key = randomInRange(15, 99);
    let value = randomInRange(1, key);
    obj[key] = value;
  }
  return obj;
};

export const rollDice = () => Math.floor(Math.random() * 6) + 1;
