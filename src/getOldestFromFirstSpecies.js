const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const firstResposible = data.employees.find((value) => value.id === id)
    .responsibleFor[0];

  const animalVerify = data.species.find((animal) => animal.id === firstResposible).residents;

  const residentsAge = animalVerify
    .map((value) => value.age)
    .sort((a, b) => a - b);

  const oldestAnimal = residentsAge[residentsAge.length - 1];

  const oldestAnimalObj = animalVerify.find((value) => value.age === oldestAnimal);

  return [oldestAnimalObj.name, oldestAnimalObj.sex, oldestAnimalObj.age];
}

module.exports = getOldestFromFirstSpecies;
