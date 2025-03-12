const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json([]);
});


app.listen(3500, () => console.log("Server running on port 3500"));
