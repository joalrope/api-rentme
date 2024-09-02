import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  return res.status(200).json({
    ok: true,
    msg: `login`,
    result: { email, password },
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  return res.status(200).json({
    ok: true,
    msg: `password changed to }`,
    result: { token, password },
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  return res.status(200).json({
    ok: true,
    msg: `password forgot to `,
    result: { email },
  });
};
