
const express = require("express");
const {classiModel} = require("../Model/classi.Model");
const  {authMiddleware} = require("../Middleware/auth.middleware");

const classiRouter = express.Router();
classiRouter.use(authMiddleware);


classiRouter.post("/classi", async (req, res) => {
    try {
        const {name, description, category, image, location, postedAt, price} = req.body;
        let user = req.id

        const newClassi = new classiModel({name, description, category, image, location, postedAt, price, user});
        await newClassi.save();


        res.status(200).json({msg: "Classified Posted Successfully"})
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", error})
    }
})

classiRouter.get("/classi", async (req, res) => {
    try {
        let classi = await classiModel.find()
        res.status(200).json({msg: "All Classified", classi})
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", error})
    }
})


classiRouter.delete("/classi/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let deletedClassi = await classiModel.findByIdAndDelete(id);
        res.status(200).json({msg: "Classified Deleted Successfully", deletedClassi})
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", error})
    }
})

classiRouter.put("/classi/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let {name, description, category, image, location, postedAt, price} = req.body;

        await classiModel.findByIdAndUpdate({_id: id}, {$set: {name, description, category, image, location, postedAt, price}});
        res.status(200).json({msg: "Classified Updated Successfully"})
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", error})
    }
})


module.exports = {classiRouter}