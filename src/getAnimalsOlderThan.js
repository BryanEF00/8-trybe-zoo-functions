const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const animalInfo = data.species.find((animalToFind) => animalToFind.name === animal);
  return animalInfo.residents.every((value) => value.age > age);
}

module.exports = getAnimalsOlderThan;
