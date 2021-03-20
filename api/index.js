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
