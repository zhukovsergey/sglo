const express = require('express');
const consola = require('consola');
const {Nuxt, Builder} = require('nuxt');
const app = express();
const config = require('../nuxt.config.js');
const mongoose = require('mongoose');
mongoose.Schema.Types.Boolean.convertToFalse.add("");
const bodyParser = require("body-parser");
require("dotenv").config();
const service2 = require("./model/service");
const blog = require("./model/blog");
const multer = require("multer");
const path = require("path");
const service = require("./model/service");
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected444 to database"));

app.use(bodyParser.json());
app.use(express.json());

const ServiceRoutes = require("./routes/service");
const BlogRoutes = require("./routes/blog");

app.get("/blog/national-projects", async function(req, res) {
  try {
    
      const blogs2 = await blog.find({tag: "Национальные проекты"})
      .select("_id h1 title introtext coverImageName url tag created_date")
      .sort("-createdDate")        
      .lean()
      .exec();
     res.json(blogs2);     
  } catch (err) {
      res.status(500).json({ message: err.message});
  }
});
app.get("/blog/education", async function(req, res) {
  try {
    
      const blogs2 = await blog.find({tag: "Образование"})
      .select("_id h1 title introtext coverImageName url tag created_date")
      .sort("-createdDate")        
      .lean()
      .exec();
     res.json(blogs2);     
  } catch (err) {
      res.status(500).json({ message: err.message});
  }
});

const uploadPath = path.join("static", blog.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png"];
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function(req,file,cb) {
        cb(null,Date.now() + file.originalname);
    }
});

const upload = multer({
    storage : storage,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});


app.post("/upload", upload.single('file'), async function (req, res, next) {  
 const newFileName = req.file != null ? req.file : null;
 try {
   await res.json(newFileName);
 } catch (err) {
   res.status(400).json({ message: err.message })
 }

});

app.post('/uploadmulti', upload.array('files', 12), async function (req, res, next) {  
 
  const newFileName = req.files != null ? req.files : null;
 try {
   await res.json(newFileName);
 } catch (err) {
   res.status(400).json({ message: err.message })
 }

});
   
  // req.files - массив файлов `photos`
  // req.body сохранит текстовые поля, если они будут


app.post("/blog", upload.array('files'), async (req, res, next) => {
  const fileName = req.file != null ? req.file.filename : null;
  const filesName = req.files != null ? req.files : null;
  console.log(filesName)
   let Blog = new blog({
      h1: req.body.h1,
      title: req.body.title,
      description: req.body.description,
      introtext: req.body.introtext,
      url: req.body.url,
      tag: req.body.tag,
      content: req.body.content,
      coverImageName: filesName
      
  });
  try {
      const newBlog = Blog.save();
      await res.status(201).json(newBlog);
  } catch (err) {
      res.status(400).json({ message: err.message});
  }
});


app.get("/blog/last10", async function(req, res) {
  try {
    
      const blogs3 = await blog.find()
      .select("_id h1 title introtext coverImageName url tag created_date")
      .sort("-createdDate") 
      .limit(6)       
      .lean()
      .exec();
     res.json(blogs3);     
  } catch (err) {
      res.status(500).json({ message: err.message});
  }
});

app.use("/service", ServiceRoutes);
app.use("/blog", BlogRoutes);  

config.dev = process.env.NODE_ENV !== 'production'
async function start () {
    const nuxt = new Nuxt(config)
  
    const { host, port } = nuxt.options.server
    await nuxt.ready()
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }
    app.use(nuxt.render)
    app.listen(port,host)
    consola.ready({
      message: 'Server listening on http://${host}:${port}',
      badge: true
    })
  }
  start()




module.exports = {
   path: '/api',
   handler: app
}
