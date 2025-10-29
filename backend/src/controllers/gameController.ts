import { Request, Response } from "express";

export const testController = (req: Request, res: Response) => {
  res.send("Game controller import works!");
};
