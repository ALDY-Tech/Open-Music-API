exports.up = (pgm) => {
  pgm.addColumn("albums", {
    cover_url: {
      type: "text",
      default: null,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("albums", "cover_url");
};
