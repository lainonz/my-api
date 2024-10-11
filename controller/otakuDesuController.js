// otakuDesuController.js
const axios = require("axios");
const cheerio = require("cheerio");

// Fungsi untuk mengambil semua anime dari homepage
const fetchAllAnime = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL; // Ambil BASE_URL dari .env
    const url = `${baseUrl}/`;

    // Fetch konten halaman utama
    const { data } = await axios.get(url);

    // Load HTML ke dalam Cheerio
    const $ = cheerio.load(data);

    // Array untuk menyimpan data anime
    const animeData = [];

    // Memilih elemen detpost yang berisi informasi anime
    $(".detpost").each((index, element) => {
      const title = $(element).find(".jdlflm").text().trim();
      const image = $(element).find("img").attr("src");
      const link = $(element).find("a").attr("href").replace(baseUrl, ""); // Menghapus base URL
      const episode = $(element)
        .find(".epz")
        .text()
        .replace("Episode ", "")
        .trim();
      const releaseDay = $(element).find(".epztipe").text().trim();
      const releaseDate = $(element).find(".newnime").text().trim();

      // Push data yang diekstrak ke dalam array
      animeData.push({ title, image, link, episode, releaseDay, releaseDate });
    });

    // Kirim data anime sebagai respons
    res.json({ animeData });
  } catch (error) {
    console.error("Error fetching data from OtakuDesu:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Fungsi untuk mengambil data anime berdasarkan pencarian
const fetchAnimeBySearch = async (req, res) => {
  try {
    const query = req.query.q || ""; // Mengambil query dari URL, default ke string kosong
    const baseUrl = process.env.BASE_URL; // Ambil BASE_URL dari .env
    const searchUrl = `${baseUrl}/?s=${encodeURIComponent(
      query
    )}&post_type=anime`;

    // Fetch konten halaman pencarian
    const { data } = await axios.get(searchUrl);

    // Load HTML ke dalam Cheerio
    const $ = cheerio.load(data);

    // Array untuk menyimpan data anime
    const animeData = [];

    // Memilih elemen li yang berisi informasi anime
    $("li").each((index, element) => {
      // Menghindari elemen yang tidak relevan
      if ($(element).find("h2 a").length) {
        const title = $(element).find("h2 a").text().trim();
        const image = $(element).find("img").attr("src");
        const link = $(element).find("h2 a").attr("href").replace(baseUrl, ""); // Menghapus base URL
        const genres = $(element)
          .find(".set")
          .eq(0)
          .text()
          .replace("Genres : ", "")
          .trim();
        const status = $(element)
          .find(".set")
          .eq(1)
          .text()
          .replace("Status : ", "")
          .trim();
        const rating = $(element)
          .find(".set")
          .eq(2)
          .text()
          .replace("Rating : ", "")
          .trim();

        // Push data yang diekstrak ke dalam array
        animeData.push({ title, image, link, genres, status, rating });
      }
    });

    // Kirim data anime sebagai respons
    res.json({ animeData });
  } catch (error) {
    console.error("Error fetching data from OtakuDesu:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

const fetchAnimeDetail = async (req, res) => {
  try {
    const { animeLink } = req.params; // Mengambil link anime dari parameter URL
    const baseUrl = process.env.BASE_URL; // Ambil BASE_URL dari .env
    const { data } = await axios.get(`${baseUrl}/anime/${animeLink}`); // Fetch konten halaman detail anime

    // Load HTML ke dalam Cheerio
    const $ = cheerio.load(data);

    // Mengambil detail anime
    const title = $(".infozingle p").eq(0).text().replace("Judul: ", "").trim();
    const japaneseTitle = $(".infozingle p")
      .eq(1)
      .text()
      .replace("Japanese: ", "")
      .trim();
    const score = $(".infozingle p").eq(2).text().replace("Skor: ", "").trim();
    const producer = $(".infozingle p")
      .eq(3)
      .text()
      .replace("Produser: ", "")
      .trim();
    const type = $(".infozingle p").eq(4).text().replace("Tipe: ", "").trim();
    const status = $(".infozingle p")
      .eq(5)
      .text()
      .replace("Status: ", "")
      .trim();
    const totalEpisodes = $(".infozingle p")
      .eq(6)
      .text()
      .replace("Total Episode: ", "")
      .trim();
    const duration = $(".infozingle p")
      .eq(7)
      .text()
      .replace("Durasi: ", "")
      .trim();
    const releaseDate = $(".infozingle p")
      .eq(8)
      .text()
      .replace("Tanggal Rilis: ", "")
      .trim();
    const studio = $(".infozingle p")
      .eq(9)
      .text()
      .replace("Studio: ", "")
      .trim();
    const genres = $(".infozingle p")
      .eq(10)
      .find("a")
      .map((i, el) => $(el).text())
      .get()
      .join(", ");

    // Mengambil daftar episode
    const episodeList = [];
    $(".episodelist ul li").each((index, element) => {
      const episodeTitle = $(element).find("span a").text();
      const episodeLink = $(element)
        .find("span a")
        .attr("href")
        .replace(baseUrl, ""); // Menghapus base URL
      const episodeDate = $(element).find(".zeebr").text();
      episodeList.push({
        title: episodeTitle,
        link: episodeLink,
        date: episodeDate,
      });
    });

    // Mengirimkan data detail anime sebagai respons
    res.json({
      title,
      japaneseTitle,
      score,
      producer,
      type,
      status,
      totalEpisodes,
      duration,
      releaseDate,
      studio,
      genres,
      episodeList,
    });
  } catch (error) {
    console.error("Error fetching anime details:", error);
    res.status(500).json({ message: "Error fetching anime details" });
  }
};

const fetchStreamAnime = async (req, res) => {
  try {
    const { episodeLink } = req.params; // Mengambil link episode dari parameter URL
    const baseUrl = process.env.BASE_URL; // Ambil BASE_URL dari .env
    const { data } = await axios.get(`${baseUrl}/episode/${episodeLink}`); // Fetch konten halaman episode

    // Load HTML ke dalam Cheerio
    const $ = cheerio.load(data);

    // Mencari daftar kualitas video
    const qualityOptions = [];
    $(".mirrorstream ul").each((index, element) => {
      const qualityClass = $(element).attr("class"); // Mendapatkan kelas yang menunjukkan kualitas
      const qualityName = qualityClass ? qualityClass.replace("m", "") : null;

      if (qualityName) {
        const mirrors = [];
        $(element)
          .find("li a")
          .each((i, el) => {
            const provider = $(el).text().trim();
            const streamLink = $(el).attr("data-content");
            if (streamLink) {
              mirrors.push({ provider, streamLink });
            }
          });

        if (mirrors.length > 0) {
          qualityOptions.push({ quality: qualityName, mirrors });
        }
      }
    });

    // Jika tidak ada opsi kualitas yang ditemukan
    if (qualityOptions.length === 0) {
      return res.status(404).json({ message: "Quality options not found" });
    }

    // Mengirimkan data opsi kualitas sebagai respons
    res.json({
      qualityOptions,
    });
  } catch (error) {
    console.error("Error fetching stream data:", error.message);
    res.status(500).json({ message: "Error fetching stream data" });
  }
};

module.exports = {
  fetchAllAnime,
  fetchAnimeBySearch,
  fetchAnimeDetail,
  fetchStreamAnime,
};
