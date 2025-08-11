const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(albumId, userId) {
    const id = `collab-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id",
      values: [id, albumId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Kolaborasi gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async deleteCollaboration(albumId, userId) {
    const query = {
      text: "DELETE FROM collaborations WHERE album_id = $1 AND user_id = $2 RETURNING id",
      values: [albumId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Kolaborasi gagal dihapus");
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const result = await this._pool.query({
      text: "SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2",
      values: [playlistId, userId],
    });

    if (!result.rowCount) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

module.exports = CollaborationsService;
