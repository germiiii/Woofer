const regexNotSpecialNorNumber = /^[a-zA-Z,'.\-\s]*$/i;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateSpecialAndNumber = str => {
  if (regexNotSpecialNorNumber.test(str)) {
    return true;
  } else {
    return false;
  }
};

const validateEmail = email => {
  if (regexEmail.test(email)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validateSpecialAndNumber,
  validateEmail,
};
