import express, { Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log("server running on port " + port);
});

app.use("/api", router);
