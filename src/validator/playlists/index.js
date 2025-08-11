const InvariantError = require("../../exceptions/InvariantError");
const { PlaylistloadSchema } = require("./schema");

const PlayListsValidator = {
  validatePlaylistsload: (payload) => {
    const validationResult = PlaylistloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlayListsValidator;
