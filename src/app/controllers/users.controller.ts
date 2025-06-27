import express, { Request, Response } from "express";
import { User } from "../models/users.model";
import { z } from "zod";

export const userRouter = express.Router();

// const CreateUserZodSchema = z.object({
//   name: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   age: z.number(),
//   password: z.string(),
//   role: z.string().optional(),
// });

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
  try {
    // const body = await CreateUserZodSchema.parse(req.body);
    const body = req.body;
    const user = await User.create(body);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
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
