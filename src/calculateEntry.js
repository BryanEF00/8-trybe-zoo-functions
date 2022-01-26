const data = require('../data/zoo_data');

/* Referência: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object */

function countEntrants(entrants) {
  const child = entrants.filter((value) => value.age < 18).length;
  const adult = entrants.filter(
    (value) => value.age >= 18 && value.age < 50,
  ).length;
  const senior = entrants.filter((value) => value.age >= 50).length;

  return { child, adult, senior };
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalEntries = countEntrants(entrants);

  const totalValue = totalEntries.child * 20.99
    + totalEntries.adult * 49.99
    + totalEntries.senior * 24.99;

  return totalValue;
}

module.exports = { calculateEntry, countEntrants };
