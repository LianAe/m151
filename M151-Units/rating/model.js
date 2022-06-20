import {connection} from "../movie/model.js";

export async function getAvgRatingByMovieId(movieId) {
    const query = "SELECT Ratings.rating FROM Ratings WHERE Ratings.movie = ?";
    const [ratings] = await connection.query(query, movieId);
    let sum = 0;
    let count = ratings.length;
    if (count === 0) {
        return sum;
    }
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating;
    }
    return sum / count;
}

export async function addOrEdditRating(userId, movieId, rating) {
    const query = "SELECT Ratings.rating FROM Ratings WHERE Ratings.movie = ? AND Ratings.user = ?";
    const [ratings] = await connection.query(query, [movieId, userId]);
    if(!ratings.pop()){
        const query = 'INSERT INTO Ratings (user, movie, rating) VALUES (?, ?, ?)';
        await connection.query(query, [userId, movieId, rating]);
        return;
    } else {
        const query = 'UPDATE Ratings SET rating = ? WHERE user = ? AND movie = ?';
        await connection.query(query, [rating, userId, movieId]);
        return;
    }
}

export async function getRatingByMovieIdAndUserID(movieId, userId) {
    const query = "SELECT Ratings.rating FROM Ratings WHERE Ratings.movie = ? AND Ratings.user = ?";
    let [rating] = await connection.query(query, [movieId, userId]);
    return rating.pop();
}