
exports.up = (pgm) => {
  // membuat table playlist_songs
  pgm.createTable("playlist_songs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    playlist_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "playlists(id)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    song_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "songs(id)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  // menghapus tabel playlist_songs
  pgm.dropTable("playlist_songs");
};
