class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
    this.putPlaylistByIdHandler = this.putPlaylistByIdHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.getSongsFromPlaylistHandler =
      this.getSongsFromPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistsload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({ name, owner });

    const response = h.response({
      status: "success",
      message: "Playlist berhasil ditambahkan",
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: owner } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(owner);

    return {
      status: "success",
      data: {
        playlists,
      },
    };
  }

  async getPlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    const playlist = await this._service.getPlaylistById(id);

    return {
      status: "success",
      data: {
        playlist,
      },
    };
  }

  async putPlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    this._validator.validatePlaylistsload(request.payload);
    const { name } = request.payload;

    await this._service.editPlaylistById(id, { name });

    return {
      status: "success",
      message: "Playlist berhasil diperbarui",
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.deletePlaylistById(id);

    return {
      status: "success",
      message: "Playlist berhasil dihapus",
    };
  }

  async getSongsFromPlaylistHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    const playlist = await this._service.getSongsFromPlaylist(id);

    return {
      status: "success",
      data: {
        playlist,
      },
    };
  }
}

module.exports = PlaylistsHandler;
