import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const noteRouter = express.Router()

noteRouter.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  // noteRouterroch 1
  /*  const myNote = new Note({
    title: "Mongoose",
    tags: {
      label: "database",
    }, 
  });
  await myNote.save();*/

  // noteRouterroch 2
  const note = await Note.create(body);

  res.status(201).json(note);
});

noteRouter.get("/", async (req: Request, res: Response) => {
  const note = await Note.find();

  res.status(201).json(note);
});
noteRouter.get("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const note = await Note.findById(id);

  res.status(201).json(note);
});

noteRouter.patch("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updateBody = req.body;
  const note = await Note.findByIdAndUpdate(id, updateBody, { new: true });

  res.status(201).json(note);
});

noteRouter.delete("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const note = await Note.findByIdAndDelete(id);
  // const note = await Note.deleteOne({_id : id});

  res.status(201).json(note);
});