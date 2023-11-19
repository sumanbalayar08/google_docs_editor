const express = require("express");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");
const app = express();

app.use(express());
app.use(cors());
app.use(express.json());

const db = require("./db.js");

app.get("/", (req, res) => {
  const sql = "SELECT * FROM docs";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error getting the data", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Data Fetched Successfully");
    res.status(200).json(data);
  });
});

app.get("/doc/:iddocs", (req, res) => {
  const { iddocs } = req.params;
  const sql = "SELECT content FROM docs WHERE iddocs = ?";

  db.query(sql, [iddocs], (err, result) => {
    if (err) {
      console.error("Error getting the data", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    const { content } = result[0];

    console.log("Data Fetched Successfully");
    res.status(200).json({ content });
  });
});

app.post("/postdoc", (req, res) => {
  const sql = "INSERT INTO docs(`title`,`content`) VALUES (?)";

  const values = [req.body.title, sanitizeHtml(req.body.content)];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error saving data to the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data saved to database");
    res.status(200).json({ message: "Data saved successfully" });
  });
});

app.put("/update/:iddocs", (req, res) => {
  const { iddocs } = req.params;
  const { content } = req.body;
  console.log(iddocs, content);

  const sql = "UPDATE docs SET content = ? WHERE iddocs = ?";

  db.query(sql, [content, iddocs], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "Document updated successfully" });
  });
});

app.listen(4000, () => {
  console.log("Server Started Successfully at 8000");
});
