import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

export const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Mongoose",
    content: "Learning mongoose",
  });
  await myNote.save();
  
  res.status(201).json({
    myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running");
});
