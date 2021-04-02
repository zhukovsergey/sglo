const express = require("express");
const router = express.Router();
const blog = require("../model/blog");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(express.json());

const uploadPath = path.join("static", blog.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png"];
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function(req,res,cb) {
        cb(null,Date.now() + file.originalname);
    }
});
const upload = multer({
    storage : storage,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

router.get("/:url", getBlog, (req, res) => {
    res.json(res.blog);
  });

router.get("/", async function(req, res) {
    try {
        const blogs = await blog.find()
        .select("_id h1 title introtext coverImageName url tag created_date")
        .sort("-created_date")        
        .lean()
        .exec();
       res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});


/* router.get("/national-projects", async function(req, res) {
  try {
    
      const blogs2 = await blog.find()
      .select("_id h1 title introtext coverImageName url tag created_date")
      .sort("-created_date")        
      .lean()
      .exec();
     res.json(blogs2);
     console.log(blogs2);
  } catch (err) {
      res.status(500).json({ message: err.message});
  }
}); */

async function getBlog(req, res, next) {
    try {
      // Ищем страницу по URL, который указан в строке запроса.
      const page = await blog.findOne({ url: req.params.url }).exec();      
      if (page === null) {
        // Возвращаем 404 ответ сервера, если страница не найдена.
        return res.status(404).json({ message: "Страницы не существует" });
      } else {
        // Передаём контент страницы, если URL найден.
        res.json(page);
        next();
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }



router.post("/", async (req, res, next) => {
     let Blog = new blog({
        h1: req.body.h1,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        introtext: req.body.introtext,
        tag: req.body.tag,
        content: req.body.content
    });
    try {
        const newBlog = Blog.save();
        await res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});
module.exports = router ;
