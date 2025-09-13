
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "text", primaryKey: true },
    username: { type: "text", notNull: true },
    password: { type: "text", notNull: true },
    fullname: { type: "text", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
