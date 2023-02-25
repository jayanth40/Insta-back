const mongoose= require("mongoose")

const ImageSchema = new mongoose.Schema({
    author: String,
    date: Date,
   description:String,
    city: String,
    imagePath: String,
  
  }, { timestamps: true });

  const Post = mongoose.model('post', ImageSchema);


  module.exports = Post