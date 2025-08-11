const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");


class PlaylistService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationsService = collaborationService
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO playlists (id, name, owner) VALUES($1, $2, $3) RETURNING id",
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError("Playlist gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `
        SELECT p.id, p.name, u.username
        FROM playlists p
        JOIN users u ON u.id = p.owner
        WHERE p.owner = $1
      `,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: `
        SELECT p.id, p.name, u.username, p.owner
        FROM playlists p
        JOIN users u ON u.id = p.owner
        WHERE p.id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }
    return result.rows[0];
  }

  async editPlaylistById(id, { name }) {
    const query = {
      text: "UPDATE playlists SET name = $1 WHERE id = $2 RETURNING id",
      values: [name, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui playlist. Id tidak ditemukan");
    }
  }

  async deletePlaylistById(id) {
    const query = {
      text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Gagal menghapus playlist. Id tidak ditemukan");
    }
  }

  async getSongsFromPlaylist(playlistId) {
    const playlist = await this.getPlaylistById(playlistId);

    const songsQuery = {
      text: `
        SELECT s.id, s.title, s.performer
        FROM playlist_songs ps
        JOIN songs s ON s.id = ps.song_id
        WHERE ps.playlist_id = $1
      `,
      values: [playlistId],
    };
    const songsResult = await this._pool.query(songsQuery);

    return {
      id: playlist.id,
      name: playlist.name,
      username: playlist.username,
      songs: songsResult.rows,
    };
  }

   async verifyPlaylistOwner(id, owner) {
    const result = await this._pool.query({
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [id],
    });

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof AuthorizationError) {
        try {
          await this._collaborationService.verifyCollaborator(playlistId, userId);
        } catch {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}

module.exports = PlaylistService;
