const express = require("express");
const {
  fetchAllAnime,
  fetchAnimeBySearch,
  fetchAnimeDetail,
  fetchStreamAnime,
} = require("../controller/otakuDesuController");
const router = express.Router();

// Rute untuk mengambil semua anime
router.get("/", fetchAllAnime);
router.get("/search", fetchAnimeBySearch);
router.get("/detail/:animeLink", fetchAnimeDetail);
router.get("/episode/:episodeLink", fetchStreamAnime);

module.exports = router;
