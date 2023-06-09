const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const verifyName = (value) =>
    value.firstName === employeeName || value.lastName === employeeName;
  return data.employees.find(verifyName);
}

module.exports = getEmployeeByName;
