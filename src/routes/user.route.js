const express = require('express');


const userRouter = express.Router()

userRouter.get("/", async (req,res) => {
    try {
        res.status(200).send("users")
    } catch (error) {
        res.status(400).send({error:error})
    }
}) 

userRouter.post("/", async (req,res) => {
    try {
        res.status(200).send("user")
    } catch (error) {
        res.status(400).send({error:error})
    }
}) 

module.exports = userRouter;