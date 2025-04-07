const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const router = express.Router();

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };

router.get("/", authenticate, async (req, res) => {

const db = req.app.locals.db;//access to the local shared db
const tasksCollection = db.collection("tasks");

    try {
    const tasks = await tasksCollection.find({ userId: req.user.userId }).toArray();//Filter by just the user's tasks
    console.log("Tasks retrieved:", tasks);
    res.json(tasks);
    } catch (error){
        console.log(error);
        res.status(500).json({message: "Error retrieving tasks"})
    }
});

router.post("/", authenticate, async (req, res) => {

const db = req.app.locals.db;//access to the local shared db
const tasksCollection = db.collection("tasks");
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: "Task is required" });
    console.log("Received task:", description);

    const newTodo = { userId: req.user.userId, //As the user must be registered, userId is already created in the /register and included in the request
        description, done: false };
    try { 
    const result = await tasksCollection.insertOne(newTodo);
    res.status(201).json(result);
    } catch(e){
        console.log(e)
        res.status(500).json({ message: "Failed to add todo" });
    }
    } 
);


module.exports = router;