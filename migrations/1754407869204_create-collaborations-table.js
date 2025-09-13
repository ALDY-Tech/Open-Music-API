
exports.up = (pgm) => {
  pgm.createTable("collaborations", {
    id: { type: "text", primaryKey: true },
    playlist_id: {
      type: "text",
      references: "playlists(id)",
      notNull: true,
      onDelete: "CASCADE",
    },
    user_id: {
      type: "text",
      references: "users(id)",
      notNull: true,
      onDelete: "CASCADE",
    }, 
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("collaborations", "collaborations_playlist_id_fkey");
  pgm.dropConstraint("collaborations", "collaborations_user_id_fkey");

  pgm.dropTable("collaborations");
};
