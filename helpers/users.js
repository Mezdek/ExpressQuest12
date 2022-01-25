const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheyCanGenerateTokens";

const calculateToken = (userEmail = "", userID) => {
  return jwt.sign({ user_id: userID, email: userEmail }, PRIVATE_KEY);
};

const verifyToken = (token = "") => {
  return jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return Promise.resolve({ error: err });
    } else {
      return Promise.resolve(decoded);
    }
  });
};

module.exports = { calculateToken, verifyToken };
