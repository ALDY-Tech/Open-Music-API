const autoBind = require("auto-bind");

class PlaylistSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._service.addSongToPlaylist(playlistId, songId, credentialId);

    return h
      .response({
        status: "success",
        message: "Lagu berhasil ditambahkan ke playlist",
      })
      .code(201);
  }

  async getPlaylistSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    const songs = await this._service.getSongsFromPlaylist(
      playlistId,
      credentialId
    );

    return {
      status: "success",
      data: { songs },
    };
  }

  async deletePlaylistSongHandler(request) {
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._service.removeSongFromPlaylist(
      playlistId,
      songId,
      credentialId
    );

    return {
      status: "success",
      message: "Lagu berhasil dihapus dari playlist",
    };
  }
}

module.exports = PlaylistSongsHandler;
