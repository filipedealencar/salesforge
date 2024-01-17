import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import SalesControllers from "./controllers/salesController";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  app.use(cors());
  next();
});

app.get("/", new SalesControllers().getSales);
app.post("/", new SalesControllers().postSales);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
