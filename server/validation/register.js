const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Le champs Nom est necessaire";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Le champs E-mail est necessaire";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email est invalide";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champs Nom est necessaire";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Veuillez Confirmer votre mot de passe";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Mot de passe doit etre entre 6 et 30 char";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "les deux mt de passe sont differentes";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};