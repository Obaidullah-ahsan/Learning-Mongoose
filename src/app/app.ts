import express, { Application, Request, Response } from "express";
import { noteRouter } from "./controllers/notes.controller";
import { userRouter } from "./controllers/users.controller";

export const app: Application = express();

app.use(express.json());
app.use("/notes", noteRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running");
});
