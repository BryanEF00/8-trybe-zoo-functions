const data = require('../data/zoo_data');

const animalsPopulation = {
  lions: 4,
  tigers: 2,
  bears: 3,
  penguins: 4,
  otters: 4,
  frogs: 2,
  snakes: 2,
  elephants: 4,
  giraffes: 6,
};

function countAnimals(animal) {
  if (!animal) {
    return animalsPopulation;
  }
  if (!animal.sex) {
    return data.species.find((value) => value.name === animal.specie).residents
      .length;
  }
  return data.species
    .find((value) => value.name === animal.specie)
    .residents.filter((value) => value.sex === animal.sex).length;
}

module.exports = countAnimals;
