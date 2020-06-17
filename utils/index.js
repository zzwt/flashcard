const config = require("config");
const jwt = require("jsonwebtoken");

const jwtSign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600 * 24 * 30,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
module.exports = { jwtSign };
