/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru.
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES ('old_album', 'old_album', 'old_album', 'old_album')"
  );

  // mengubah nilai owner pada album yang owner-nya bernilai NULL
  pgm.sql("UPDATE albums SET owner = 'old_album' WHERE owner IS NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    "albums",
    "fk_albums.owner_users.id",
    "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint("albums", "fk_albums.owner_users.id");

  // mengubah nilai owner old_album pada note menjadi NULL
  pgm.sql("UPDATE albums SET owner = NULL WHERE owner = 'old_album'");

  // menghapus user baru.
  pgm.sql("DELETE FROM users WHERE id = 'old_album'");
};
