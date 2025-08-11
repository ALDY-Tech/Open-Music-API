const routes = (handler) => [
  {
    method: "POST",
    path: "/playlists/{id}/songs",
    handler: handler.postSongToPlaylistHandler,
  },
  {
    method: "GET",
    path: "/playlists/{id}/songs",
    handler: handler.getSongsFromPlaylistHandler,
  },
  {
    method: "DELETE",
    path: "/playlists/{id}/songs",
    handler: handler.deleteSongFromPlaylistHandler,
  },
];

module.exports = routes;