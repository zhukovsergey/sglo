const { isNumeric } = require("jquery");
const mongoose = require("mongoose");
const path = require("path");
const coverImageBasePath = "uploads/blog"

const blogSchema = new mongoose.Schema({
  // Описываем модель Page. То есть из чего состоит динамическая страница сайта.

  url: {
    // Например, адрес страницы является строкой. Он обязателен и должен быть уникальным.
    type: String,
    unique: true,
    required: true,
  },
  h1: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default:0,
  },
  introtext: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
   content: {
    type: String,
    required: true,
  },
  createdDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now,
  },
  coverImageName: {},
  coverImagesName: {}
  
});

blogSchema.virtual("coverImagePath").get(function() {
    if (this.coverImageName !== null) {
        return path.join("/", coverImageBasePath, this.coverImageName);
    } 
})

module.exports = mongoose.model("blog", blogSchema);
module.exports.coverImageBasePath = coverImageBasePath;
