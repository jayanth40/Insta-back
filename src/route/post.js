const router = require("express").Router();
const multer = require("multer")
const path = require("path");
const fs = require("fs");

const { MongoClient } = require('mongodb');

const uploadDir = path.join(__dirname, "./uploads");

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage },{
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Require your Post model
const Post = require("../model/model");

// Endpoint for uploading an image and updating a Post document
router.post("/newpost", upload.single("image"), async (req, res) => {
  const { author, city, date,description} = req.body;
  const { filename } = req.file;
  const imagePath = filename;

  const post = new Post({
    author,
    city,
    description,
    date,
    imagePath,
    filename
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.log('Error saving post to database:', error.message);
    res.status(500).json({ error: 'Error saving post to database' });
  }
  
});




router.get('/posts/:image', async (req,res)=>{
  
  res.sendFile(path.join(__dirname,  `/uploads/${req.params.image}`))
})
router.get('/posts',async(req,res)=>{
  const post = await Post.find().sort({createdAt: 'desc'});
  res.send(post)
})

module.exports = router;






