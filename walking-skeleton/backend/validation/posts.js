const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePostInput(data) {
  let errors = {};
  
  data.title = validText(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 5, max: 140 })) {
    errors.title = 'Post must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};