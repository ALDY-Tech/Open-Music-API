exports.up = (pgm) => {
  pgm.createTable("playlists", {
    id: { type: "text", primaryKey: true },
    name: { type: "text", notNull: true },
    owner: {
      type: "text",
      references: "users(id)",
      notNull: true,
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("playlists", "playlists_owner_fkey");

  pgm.dropTable("playlists");
};
