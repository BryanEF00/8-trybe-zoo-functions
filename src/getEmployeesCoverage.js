const data = require('../data/zoo_data');

const { employees, species } = data;

function employeeValidation(info) {
  return employees.find(
    (value) =>
      [value.firstName, value.lastName].includes(info.name)
      || value.id === info.id,
  );
}

const employeeInfo = (employee) => {
  const getResponsibleFor = employees.find(
    (value) => value.id === employee.id,
  ).responsibleFor;
  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: getResponsibleFor.map(
      (value) => species.find((animal) => animal.id === value).name,
    ),
    locations: getResponsibleFor.map(
      (value) => species.find((animal) => animal.id === value).location,
    ),
  };
};

const getAllEmployee = () =>
  employees.reduce((accumulator, value, index) => {
    accumulator[index] = employeeInfo(value);
    return accumulator;
  }, []);

function getEmployeesCoverage(info) {
  if (!info) return getAllEmployee();
  if (info.name || info.id) {
    const employeeObj = employeeValidation(info);

    if (!employeeObj) throw new Error('Informações inválidas');

    return employeeInfo(employeeObj);
  }
}

module.exports = getEmployeesCoverage;
