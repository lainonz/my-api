const { ANIME } = require("@consumet/extensions");

const searchAnime = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const zoro = new ANIME.Zoro();
    zoro.search(query).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.error("Error searching anime:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  searchAnime,
};
