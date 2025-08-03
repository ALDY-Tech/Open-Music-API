const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class SongsService {
    constructor() {
        this._songs = [];
    }

    addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const newSong = {
            id, title, year, genre, performer, duration, albumId,
        };

        this._songs.push(newSong);

        const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError("Song gagal ditambahkan");
        }

        return id;
    }

    getSongs() {
        return this._songs;
    }

    getSongById(id) {
        const song = this._songs.filter((n) => n.id === id)[0];
        if (!song) {
            throw new NotFoundError("Song tidak ditemukan");
        }
        return song;
    }

    editSongById(id, { title, year, performer, genre, duration, albumId }) {
        const index = this._songs.findIndex((song) => song.id === id);
        if (index === -1) {
            throw new NotFoundError("Gagal memperbarui song. Id tidak ditemukan");
        }

        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            performer,
            genre,
            duration,
            albumId,
        };

        const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError("Song gagal diperbarui");
        }
        return this._songs[index];
    }

    deleteSongById(id) {
        const index = this._songs.findIndex((song) => song.id === id);
        if (index === -1) {
            throw new NotFoundError("Song gagal dihapus. Id tidak ditemukan");
        }

        this._songs.splice(index, 1);
        return { message: "Song berhasil dihapus" };
    }
    }

module.exports = SongsService;