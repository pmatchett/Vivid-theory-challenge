import express, { Express, Request, Response } from "express";
import path from "path"
import * as dotenv from "dotenv";
dotenv.config();
import {router} from "./routes"

const app: Express = express();
const port = process.env.PORT;

app.use(
  express.static(path.join(__dirname, "../frontend/build"))
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
})

app.use(router)

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
})


app.listen(port, () => {
  console.log(`Vivid Theory challenge listening on port ${port}`);
})

