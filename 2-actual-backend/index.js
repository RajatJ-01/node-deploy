const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const model = require("./model/products");
const Items = model.Items;

const corsOptions = {
  origin: "*", // Allow requests from this origin
  methods: ["GET", "POST"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type"], // Allow these headers
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/items", async (req, res) => {
  const items = await Items.find();
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json(items);
});

app.post("/items", async (req, res) => {
  const items = new Items(req.body);
  items
    .save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, process.env.PUBLIC_DIR, "index.html"));
});
app.listen(process.env.PORT);
