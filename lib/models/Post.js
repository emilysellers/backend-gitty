const pool = require('../utils/pool');

class Post {
  id;
  title;
  description;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
  }

  static async insert({ title, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO posts (title, description)
        VALUES ($1, $2)
        RETURNING *
        `,
      [title, description]
    );
    return new Post(rows[0]);
  }
}

module.exports = { Post };
