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

router.get('/', async function(req, res) {
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

router.post("/", async (req, res, next) => {
     let Blog = new blog({
        h1: req.body.h1,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        introtext: req.body.introtext,
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
