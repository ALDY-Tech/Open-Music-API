const Jwt = require("@hapi/jwt");
const InvariantError = require("../exceptions/InvariantError");

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
  throw new Error("ACCESS_TOKEN_KEY and REFRESH_TOKEN_KEY must be defined in .env file");
}

const TokenManager = {
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError("Refresh token tidak valid");
    }
  },
};

module.exports = TokenManager;
