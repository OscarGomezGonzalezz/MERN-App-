const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnection");
require("dotenv").config();//Load the .env file


const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/tasksRoutes");


const app = express();
connectDB().then(client => {
    const db = client.db("TODODB"); //Creates the database if it does not exist, and the same with the collection
    app.locals.db = db;  // Attach db to app locals so routes can access it


    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", todoRoutes);

    app.listen(3500, () => console.log("Server running on port 3500"));

}

).catch(console.error);


