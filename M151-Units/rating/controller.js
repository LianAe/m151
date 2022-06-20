import {getAvgRatingByMovieId, addOrEdditRating, getRatingByMovieIdAndUserID} from "./model.js";

export async function getRatingbyMovieId(request, response) {
    const movieId = request.params.movieId;
    const data = getAvgRatingByMovieId(movieId);
    response.send(data);
}

export async function getRatingByUserId(request, response) {
    let movieId = request.params.movieId;
    const data = await getRatingByMovieIdAndUserID(movieId, request.user.id);
    response.send(data);
}

export async function saveRating(request, response) {
    console.log("save: " + request.user.id);
    await addOrEdditRating(request.user.id, request.params.movieId, request.params.rating);
    response.redirect("/");
}