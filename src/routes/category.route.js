const express = require('express');


const categoryRouter = express.Router()

categoryRouter.get("/", async (req,res) => {
    try {
        res.status(200).send("categories")
    } catch (error) {
        res.status(400).send({error:error})
    }
}) 

categoryRouter.post("/", async (req,res) => {
    try {
        res.status(200).send("category")
    } catch (error) {
        res.status(400).send({error:error})
    }
}) 

module.exports = categoryRouter;