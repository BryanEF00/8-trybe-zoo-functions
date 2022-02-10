const data = require('../data/zoo_data');

/* Referência de Reduce com Spread Operator: https://vmarchesin.medium.com/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8 */

const { hours, species } = data;

const weekDays = Object.entries(hours);
const validDays = Object.keys(hours);
const animals = species.map((value) => value.name);
const allEntries = (weekDays + animals).split(',');

/* Schedule Generator */
const weekSchedule = () =>
  weekDays.reduce((accumulator, day) => {
    const openDay = `Open from ${day[1].open}am until ${day[1].close}pm`;
    const closedDay = 'CLOSED';
    const openExhibition = species
      .filter((animal) => animal.availability.includes(day[0]))
      .map((value) => value.name);
    const closedExhibition = 'The zoo will be closed!';

    return {
      ...accumulator,
      [day[0]]: {
        officeHour: day[1].open > 0 ? openDay : closedDay,
        exhibition: day[1].open > 0 ? openExhibition : closedExhibition,
      },
    };
  }, {});

/* HANDLERS */
const daySchedule = (day) => {
  const chosenDay = Object.entries(hours).find((value) =>
    value[0].includes(day));
  const openDay = `Open from ${chosenDay[1].open}am until ${chosenDay[1].close}pm`;
  const closedDay = 'CLOSED';
  const openExhibition = species
    .filter((animal) => animal.availability.includes(chosenDay[0]))
    .map((value) => value.name);
  const closedExhibition = 'The zoo will be closed!';

  const dayInfo = {
    [chosenDay[0]]: {
      officeHour: chosenDay[1].open > 0 ? openDay : closedDay,
      exhibition: chosenDay[1].open > 0 ? openExhibition : closedExhibition,
    },
  };
  return dayInfo;
};

const animalSchedule = (animal) =>
  species.find((value) => value.name === animal).availability;

/* HELPERS */

const verifyInput = (scheduleTarget) => {
  if (validDays.includes(scheduleTarget)) return daySchedule(scheduleTarget);
  if (animals.includes(scheduleTarget)) return animalSchedule(scheduleTarget);
  if (!allEntries.includes(scheduleTarget)) return weekSchedule();
};

function getSchedule(scheduleTarget) {
  if (!scheduleTarget) return weekSchedule();
  return verifyInput(scheduleTarget);
}

console.log(daySchedule('Tuesday'));

module.exports = getSchedule;
