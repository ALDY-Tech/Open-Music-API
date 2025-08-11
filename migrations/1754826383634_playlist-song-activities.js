exports.up = (pgm) => {
pgm.createTable('playlist_song_activities', {
    id: { type: 'varchar(50)', primaryKey: true },
    playlist_id: {
      type: 'varchar(50)',
      references: '"playlists"',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    song_id: {
      type: 'varchar(50)',
      references: '"songs"',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    user_id: {
      type: 'varchar(50)',
      references: '"users"',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    action: { type: 'text', notNull: true },
    time: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  // menghapus tabel playlist_song_activities
  pgm.dropTable("playlist_song_activities");
};
