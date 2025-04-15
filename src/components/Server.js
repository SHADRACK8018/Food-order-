const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const dbFilePath = path.join(__dirname, "db2.json");

if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify([], null, 2));
}

let deliveries = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

app.post("/deliveries",  (req, res) => {
  const deliveryData = req.body;

  if (!deliveryData || !deliveryData.address) {
    return res.status(400).json({ error: "Invalid delivery data" });
  }

  deliveries.push(deliveryData) ;

  fs.writeFileSync(dbFilePath, JSON.stringify(deliveries, null, 2));

  res.status(201).json(deliveryData);
});

app.get("/deliveries", (req, res) => {
  res.json(deliveries);

}) ;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});