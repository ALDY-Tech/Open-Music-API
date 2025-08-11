const modelAlbums = ({ id, name, year, owner }) => ({
  id,
  name,
  year,
  owner,
});

const modelSongs = ({ id, title, year, performer, genre, duration, albumId }) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
});

module.exports = { modelAlbums, modelSongs };
