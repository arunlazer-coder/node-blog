const { check } = require("express-validator");
const notEmpty = (key) => {
  return key.map((element) => {
    let title = element.t || element;
    let param = element.p || element
    return check(param, `${title} is required`).not().isEmpty();
  });
};

exports.registerVal = [
   ...notEmpty(["title", "url", "content"]),
];

