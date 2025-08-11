
exports.up = (pgm) => {
  // membuat table playlists
  pgm.createTable("playlists", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  // menghapus tabel playlists
  pgm.dropTable("playlists");
};
