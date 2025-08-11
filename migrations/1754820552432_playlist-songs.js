
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: "playlists",
    },
    song_id: {
      type: "VARCHAR(50)",
      notNull: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: "songs",
    },
  });
};

exports.down = (pgm) => {
  // menghapus tabel playlist_songs
  pgm.dropTable("playlist_songs");
};
