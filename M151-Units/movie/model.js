import mysql from "mysql2/promise"; 
import { getAvgRatingByMovieId } from "../rating/model.js"; 

export const connection = await mysql.createConnection({ 
    host: '127.0.0.1',
    user: 'root',
    password: 'sml12345',
    database: 'movie-db',
}); 

await connection.connect(); 

export async function getAll(uid) {
    const query = "SELECT Movies.id, Movies.title, Movies.year, Movies.ownerId, Movies.isPublic, IFNULL(R.rating,0) as 'userRating' FROM Movies " +
    " Left JOIN Ratings R on Movies.id = R.movie and R.user = ? WHERE Movies.isPublic = true OR Movies.ownerId = ?;";
    let [data] = await connection.query(query, [uid, uid]);
    for (let movie of data){
      movie.rating = await getAvgRatingByMovieId(movie.id);
    }
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