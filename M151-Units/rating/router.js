import {Router} from "express";
import { getRatingbyMovieId, getRatingByUserId, saveRating } from "./controller.js";

const router = Router();

router.get("/:movieId/:rating", saveRating);
router.get("/averageRating/:movieId", getRatingbyMovieId);
router.get("/getUserRating/:movieId", getRatingByUserId);

export {router};