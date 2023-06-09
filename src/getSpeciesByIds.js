const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }

  if (ids.length === 1) {
    const animalInfo = [];

    const idValidation = data.species.find((idValue) => idValue.id === ids[0]);

    animalInfo.push(idValidation);

    return animalInfo;
  }

  return data.species.filter((animalId, index) => animalId.id === ids[index]);
}

module.exports = getSpeciesByIds;
