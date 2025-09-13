
exports.up = (pgm) => {
  pgm.createTable("albums", {
    id: { type: "text", primaryKey: true },
    name: { type: "text", notNull: true },
    year: { type: "integer", notNull: true },
    created_at: { type: "bigint", notNull: true },
    updated_at: { type: "bigint", notNull: true },
  });
};
exports.down = (pgm) => {
  pgm.dropTable("albums");
};
