exports.up = (pgm) => {
pgm.createTable('playlist_song_activities', {
    id: { type: 'varchar(50)', primaryKey: true },
    playlist_id: {
      type: 'varchar(50)',
      references: 'playlists(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      notNull: true,
    },
    song_id: {
      type: 'varchar(50)',
      references: 'songs(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      notNull: true,
    },
    user_id: {
      type: 'varchar(50)',
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      notNull: true,
    },
    action: { type: 'text', notNull: true },
    time: { type: 'text', notNull: true },
  });
};

exports.down = (pgm) => {
  // menghapus tabel playlist_song_activities
  pgm.dropTable("playlist_song_activities");
};
