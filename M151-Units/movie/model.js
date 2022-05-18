import mysql from "mysql2/promise"; 

const connection = await mysql.createConnection({ 
    host: '127.0.0.1',
    user: 'root',
    password: 'sml12345',
    database: 'movie-db',
}); 

await connection.connect(); 

export async function getAll(uid) {
    const query = 'SELECT * FROM Movies WHERE isPublic = true OR ownerId = ?';
    const [data] = await connection.query(query, uid);
    return data;
  }
  
  async function insert(movie) {
    const query = 'INSERT INTO Movies (title, year, isPublic, ownerId) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [movie.title, movie.year, movie.isPublic, movie.ownerId]);
    return { ...movie, id: result.insertId };
  }
  
  async function update(movie) {
    const query = 'UPDATE Movies SET title = ?, year = ?, isPublic = ?, ownerId = ? WHERE id = ?';
    await connection.query(query, [movie.title, movie.year, movie.isPublic, movie.ownerId, movie.id]);
    return movie;
  }
  
  export async function get(id) {
    const query = 'SELECT * FROM Movies WHERE id = ?';
    const [data] = await connection.query(query, [id]);
    return data.pop();
  }
  
  export async function remove(id) {
    const query = 'DELETE FROM Movies WHERE id = ?';
    await connection.query(query, [id]);
    return;
  }
  
  export function save(movie) {
    if (!movie.id) {
      return insert(movie);
    } else {
      return update(movie);
    }
  }