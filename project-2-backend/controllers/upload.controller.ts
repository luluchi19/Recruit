import { Request, Response } from "express";

export const imagePost = async (req: Request, res: Response) => {
  res.json({
    location: req?.file?.path
  })
}
