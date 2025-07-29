const modelAlbums = ({ id, name, year }) => ({
  id,
  name,
  year,
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
