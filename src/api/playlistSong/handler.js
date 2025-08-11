const autoBind = require("auto-bind");

class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePostSongToPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsService.getSongById(songId);
    await this._playlistsService.addSongToPlaylist(playlistId, songId);

    const response = h.response({
      status: "success",
      message: "Lagu berhasil ditambahkan ke playlist",
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songs = await this._playlistsService.getSongsFromPlaylist(playlistId);

    return {
      status: "success",
      data: { songs },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    this._validator.validateDeleteSongFromPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: "success",
      message: "Lagu berhasil dihapus dari playlist",
    };
  }
}

module.exports = PlaylistsHandler;
