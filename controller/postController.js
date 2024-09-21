const Post = require("../model/postModel");

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;

  // Jika tidak ada gambar yang diunggah, 'images' diisi dengan array kosong
  const images =
    req.files && req.files.length > 0
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : []; // Atau Anda bisa menggunakan `null` sesuai kebutuhan

  try {
    const newPost = new Post({
      title,
      content,
      category,
      images, // Jika kosong, ini tetap akan berupa array kosong
    });

    await newPost.save();
    // console.log("Post created:", newPost);
    res.status(201).json(newPost);
  } catch (err) {
    // console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post", error: err });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Anda bisa menambahkan filter atau paginasi
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Cari artikel berdasarkan ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post); // Kembalikan artikel yang ditemukan
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};
