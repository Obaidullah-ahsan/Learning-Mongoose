import express, { Request, Response } from "express";
import { User } from "../models/users.model";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const user = await User.find();

  res.status(201).json(user);
});
userRouter.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json(user);
});

userRouter.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json(user);
});
userRouter.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });

  res.status(201).json(user);
});
userRouter.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json(user);
});
