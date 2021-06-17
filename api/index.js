const express = require('express')
const nodemailer = require('nodemailer');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')
const config = require('../nuxt.config.js')
mongoose.Schema.Types.Boolean.convertToFalse.add('')
const bodyParser = require('body-parser')
require('dotenv').config()
const service2 = require('./model/service')
const blog = require('./model/blog')
const path = require('path')
const service = require('./model/service')
const fs = require('fs')
const helmet = require("helmet")
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/api', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
  
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected444 to database'))

app.use(bodyParser.json())
app.use(express.json())

app.post('/contact', async (req, res) => {
  const namefio = req.body.namefio;
  const mailtext= req.body.mailtext;
 const  email= req.body.email;
 const  url = req.headers.referer;
  sendMail(namefio, mailtext, email, url);  
  await res.status(201).json('Сообщение отправлено');
  });
  const sendMail = async (namefio, mailtext, email, url) => {
    let transporter = await nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: "zhukov@etalon48.com",
            pass: "zhukov06061988"
        }
    });
    transporter.sendMail({
        from: 'zhukov@etalon48.com',
        to: 'zhukov@etalon48.com',
        subject: 'Сообщение с сайта Союза женщин Липецкой области',
        html:
        "Имя: " +
         namefio +
          "<br>Текст: " + 
          mailtext + 
          "<br>Почта: " + 
          email +
          "<br>Страница: " +
          url
    });

}
app.get('/blog/national-projects', async function (req, res) {
  try {
    const blogs2 = await blog.find({ tag: 'Национальные проекты' })
      .select('_id h1 title introtext coverImageName url tag createdDate views')
      .sort('-createdDate')
      .lean()
      .exec()
    res.json(blogs2)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/blog/photos', async function (req, res) {
  try {
    const blogs2 = await blog.find()
      .select('_id h1 coverImageName createdDate')
      .sort('-createdDate')
      .lean()
      .exec()
    res.json(blogs2)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
app.get('/blog/health', async function (req, res) {
  try {
    const blogs2 = await blog.find({ tag: 'Здравоохранение' })
      .select('_id h1 title introtext coverImageName url tag createdDate views')
      .sort('-createdDate')
      .lean()
      .exec()
    res.json(blogs2)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
app.get('/blog/education', async function (req, res) {
  try {
    const blogs2 = await blog.find({ tag: 'Образование' })
      .select('_id h1 title introtext coverImageName url tag createdDate views')
      .sort('-createdDate')
      .lean()
      .exec()
    res.json(blogs2)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/blog/sitemap', async (req, res) => {
  try {
    const blogs = await blog.find()
      .select('_id url')
      .lean()
    blogs.forEach(function (element) {
      element.path = '/blog/'
    })
    await res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

const uploadPath = path.join('static', blog.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png']
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, uploadPath)
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

app.post('/upload', upload.single('file'), async function (req, res, next) {
  const newFileName = req.file != null ? req.file : null
  try {
    await res.json(newFileName)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.post('/uploadmulti', upload.array('files', 12), async function (req, res, next) {
  const newFileName = req.files != null ? req.files : null
  try {
    await res.json(newFileName)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// req.files - массив файлов `photos`
// req.body сохранит текстовые поля, если они будут

app.post('/blog', upload.array('files'), async (req, res, next) => {
  const fileName = req.file != null ? req.file.filename : null
  const filesName = req.files != null ? req.files : null
  const Blog = new blog({
    h1: req.body.h1,
    title: req.body.title,
    description: req.body.description,
    introtext: req.body.introtext,
    url: req.body.url,
    tag: req.body.tag,
    content: req.body.content,
    coverImageName: filesName

  })
  try {
    const newBlog = Blog.save()
    await res.status(201).json(newBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/blog/last10', async function (req, res) {
  try {
    const blogs3 = await blog.find()
      .select('_id h1 title introtext coverImageName url tag created_date')
      .sort('-createdDate')
      .limit(6)
      .lean()
      .exec()
    res.json(blogs3)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/blog/search', async function (req, res) {
  const sText = req.query.searchText
  try {
    const blogs4 = await blog.find({
      h1: { $regex: `${sText}`, $options: 'i' }
    })
      .select('h1 url')
      .sort('-createdDate')
      .limit(6)
      .lean()
      .exec()
    res.json(blogs4)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
const ServiceRoutes = require('./routes/service')
const BlogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

app.use('/service', ServiceRoutes)
app.use('/blog', BlogRoutes)
app.use('/auth', authRoutes)


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
  app.listen(port, host)
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
