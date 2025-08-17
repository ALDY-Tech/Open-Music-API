const ActivityHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "activities",
  version: "1.0.0",
  register: async (
    server,
    { service, validator, collaborationsService, playlistsService }
  ) => {
    const activityHandler = new ActivityHandler(
      service,
      validator,
      collaborationsService,
      playlistsService
    );
    server.route(routes(activityHandler));
  },
};
