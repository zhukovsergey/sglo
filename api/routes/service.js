const express = require("express");
const router = express.Router();
const service = require("../model/service");
const app = express();

app.use(express.json());

router.get('/', async function(req, res) {
    try {
        const services = await service.find({})
       res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

router.post("/", async (req, res, next) => {
     let Service = new service({
        h1: req.body.h1,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        content: req.body.content
    });
    try {
        const newService = Service.save();
        await res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});
module.exports = router ;

 