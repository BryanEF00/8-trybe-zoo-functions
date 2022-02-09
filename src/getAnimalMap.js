const data = require('../data/zoo_data');

const { species } = data;

/* Referência de SET: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set */

/* Referência de Reduce com Spread Operator: https://vmarchesin.medium.com/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8 */

const mapLocations = [...new Set(data.species.map((value) => value.location))];

/* Map Generator */

const mapSummary = () =>
  mapLocations.reduce(
    (accumulator, location) => ({
      ...accumulator,
      [location]: species
        .filter((animal) => animal.location === location)
        .map((value) => value.name),
    }),
    {},
  );

/* CONSTRUCTORS */
const mapNames = () =>
  mapLocations.reduce(
    (accumulator, location) => ({
      ...accumulator,
      [location]: species
        .filter((animal) => animal.location === location)
        .map((value) => ({
          [value.name]: value.residents.map((resident) => resident.name),
        })),
    }),
    {},
  );

const nameSorted = () =>
  mapLocations.reduce(
    (accumulator, location) => ({
      ...accumulator,
      [location]: species
        .filter((animal) => animal.location === location)
        .map((value) => ({
          [value.name]: value.residents.map((resident) => resident.name).sort(),
        })),
    }),
    {},
  );

const mapSex = (sex) =>
  mapLocations.reduce(
    (accumulator, location) => ({
      ...accumulator,
      [location]: species
        .filter((animal) => animal.location === location)
        .map((value) => ({
          [value.name]: value.residents
            .filter((resident) => resident.sex === sex)
            .map((animal) => animal.name),
        })),
    }),
    {},
  );

const sexSorted = (sex) =>
  mapLocations.reduce(
    (accumulator, location) => ({
      ...accumulator,
      [location]: species
        .filter((animal) => animal.location === location)
        .map((value) => ({
          [value.name]: value.residents
            .filter((resident) => resident.sex === sex)
            .map((animal) => animal.name)
            .sort(),
        })),
    }),
    {},
  );

/* HANDLERS */

const namesHandler = (options) => {
  if (options.includeNames && options.sorted) return nameSorted();
  if (options.includeNames) return mapNames();
};

const sexHandler = (options) => {
  if (options.sex && options.sorted) return sexSorted(options.sex);
  if (options.sex) return mapSex(options.sex);
};

const generalHandler = (options) => {
  if (options.includeNames && options.sex) return sexHandler(options);
  if (options.includeNames && !options.sex) return namesHandler(options);
};

/* Main Function */
function getAnimalMap(options) {
  if (!options || !options.includeNames) return mapSummary();
  return generalHandler(options);
}

module.exports = getAnimalMap;
