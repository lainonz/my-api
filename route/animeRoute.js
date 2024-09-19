const express = require("express");
const { searchAnime } = require("../controller/anime/controller");
const router = express.Router();

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     summary: Search for anime by title
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Title of the anime to search for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of anime matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the anime
 *                       title:
 *                         type: string
 *                         description: Title of the anime
 *                       url:
 *                         type: string
 *                         description: URL to the anime details
 *                       image:
 *                         type: string
 *                         description: Image of the anime
 *                       synopsis:
 *                         type: string
 *                         description: Synopsis of the anime
 *                       genres:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of genres for the anime
 *       400:
 *         description: Query parameter is required
 *       500:
 *         description: Internal server error
 */

router.get("/search", searchAnime);

module.exports = router;
