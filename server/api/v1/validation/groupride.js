const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valistart_dateGroupRideInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.from_route = !isEmpty(data.from_route) ? data.from_route : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  
  if (Validator.isEmpty(data.from_time)) {
    errors.from_time = 'From time field is required';
  }
  
  if (Validator.isEmpty(data.from_route)) {
    errors.from_route = 'From route field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
