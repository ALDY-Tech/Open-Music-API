const joi = require("joi");

const PlaylistloadSchema = joi.object({
    name: joi.string().required(),
    owner : joi.string(),
});

module.exports = { PlaylistloadSchema };