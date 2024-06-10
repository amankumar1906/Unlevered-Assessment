import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const app = express();
const port = process.env.PORT || 5000;

const baseDir = path.resolve(__dirname, "..", "src");

app.get("/", (req, res) => {
  res.send(
    "Welcome to the financial data API. Use /api/financials or /api/financials/:interval to get data."
  );
});

app.get("/api/financials", (req, res) => {
  res.sendFile(path.join(baseDir, "data", "stock-data.json"));
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

app.get("/api/financials/:interval", async (req, res) => {
  const { interval } = req.params;
  let filePath = "";

  if (interval === "D") {
    filePath = path.join(baseDir, "data", "daily.csv");
  } else if (interval === "W") {
    filePath = path.join(baseDir, "data", "weekly.csv");
  } else if (interval === "M") {
    filePath = path.join(baseDir, "data", "monthly.csv");
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
