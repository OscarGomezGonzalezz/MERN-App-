const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnection");
const { ObjectId } = require('mongodb');


const app = express();
connectDB().then(client => {
    const db = client.db("TODODB"); //Creates the database if it does not exist, and the same with the collection
    const tasksCollection = db.collection("tasks");

    app.use(cors());
    app.use(express.json());


    app.get("/tasks", async (req, res) => {

        try {
        const tasks = await tasksCollection.find().toArray();
        console.log("Tasks retrieved:", tasks);
        res.json(tasks);
        } catch (error){
            console.log(error);
            res.status(500).json({message: "Error retrieving tasks"})
        }
    });

    app.post("/tasks", async (req, res) => {
        const { description } = req.body;
        if (!description) return res.status(400).json({ error: "Task is required" });
        console.log("Received task:", description);

        const newTodo = { description, done: false };
        try { 
        const result = await tasksCollection.insertOne(newTodo);
        res.status(201).json(result);
        } catch(e){
            console.log(e)
            res.status(500).json({ message: "Failed to add todo" });
        }
        } 
    );

    app.delete("/tasks/:id", async (req, res) => {
        const { id } = req.params;
  
        try {
          const mongoId = new ObjectId(id);//mongo does not interpret ids like normal strings, but special objetcs
          await tasksCollection.deleteOne({ _id: mongoId });
          res.json({ message: "Deleted successfully" });
          console.log("Deleted todo with id:", id);
        } catch (error) {
          res.status(500).json({ error: "Failed to delete todo" });
        }
      });


    app.listen(3500, () => console.log("Server running on port 3500"));

}

).catch(console.error);


