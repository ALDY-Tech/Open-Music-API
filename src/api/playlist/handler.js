const autoBind = require("auto-bind");

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({ name, owner });

    const response = h.response({
      status: "success",
      message: "Playlist berhasil ditambahkan",
      data: { playlistId },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(owner);

    return h.response({
      status: "success",
      data: { playlists },
    });
  }

  async getPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(id, owner);
    const playlist = await this._service.getPlaylistById(id);

    return h.response({
      status: "success",
      data: { playlist },
    });
  }

  async putPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;

    await this._service.editPlaylistById(id, { name });

    return h.response({
      status: "success",
      message: "Playlist berhasil diperbarui",
    });
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.deletePlaylistById(id);

    return h.response({
      status: "success",
      message: "Playlist berhasil dihapus",
    });
  }
}

module.exports = PlaylistsHandler;
