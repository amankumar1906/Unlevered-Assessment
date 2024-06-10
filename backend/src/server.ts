import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, "../../../frontend/stock-data/build"))
);

// API endpoint for the root
app.get("/", (req, res) => {
  res.send(
    "Welcome to the financial data API. Use /api/financials or /api/financials/:interval to get data."
  );
});

// API endpoint for financials data
app.get("/api/financials", (req, res) => {
  res.sendFile(path.join(__dirname, "data/stock-data.json"));
});

const readCSV = (filePath: string) => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

// API endpoint for financials data with interval
app.get("/api/financials/:interval", async (req, res) => {
  const { interval } = req.params;
  let filePath = "";

  if (interval === "D") {
    filePath = path.join(__dirname, "data/daily.csv");
  } else if (interval === "W") {
    filePath = path.join(__dirname, "data/weekly.csv");
  } else if (interval === "M") {
    filePath = path.join(__dirname, "data/monthly.csv");
  } else {
    return res.status(400).json({ error: "Invalid interval" });
  }

  try {
    const data = await readCSV(filePath);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Serve React frontend for any other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend/stock-data/build/index.html")
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
