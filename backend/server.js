const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnection");

const app = express();
connectDB().then(client => {
    const db = client.db("TODODB"); 
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

        const newTodo = { description, completed: false };
        try { 
        const result = await tasksCollection.insertOne(newTodo);
        res.status(201).json(result.ops[0]);
        } catch(e){
            console.log(e)
            res.status(500).json({ error: "Failed to add todo" });
        }
        } 
    );


    app.listen(3500, () => console.log("Server running on port 3500"));

}

).catch(console.error);


