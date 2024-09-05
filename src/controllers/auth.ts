import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { IUser, User } from "../models";
import { generateJWT } from "../helpers/jwt";
//import crypto from "crypto";
import { HttpStatus /*sendEmail*/ } from "../helpers";
//import { returnErrorStatus } from ".";
//import { sendEmail } from "../helpers";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user: IUser | null;

  try {
    // Verificar si el email existe
    user = await User.findOne({ where: { email } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!user) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: "User / Password are not correct",
      result: { user: {} },
    });
  }

  // Verificar la contraseña
  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(HttpStatus.CONFLICT).send({
      ok: false,
      msg: "User / Password are not correct - status: false",
      result: {
        user: {},
      },
    });
  }

  // Generar el JWT
  const token = await generateJWT(user.id, user.email, user.role);

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Login successful",
    result: {
      user,
      token,
    },
  });
};

export const changePassword = async (_req: Request, _res: Response) => {
  /* const { token, password } = req.body;

  const user = await User.findOne({
    "resetPassword.token": token,
  });

  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: "User not found",
      result: {},
    });
  }

  const {
    resetPassword: { expires },
  } = user;

  if (Date.now() > expires) {
    return res.status(404).json({
      ok: false,
      msg: "Token expired",
      result: {},
    });
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  user.resetPassword = {
    token: "",
    expires: 0,
  };

  try {
    await user!.save();
  } catch (error) {
    returnErrorStatus(error, res);
  }

  return res.status(200).json({
    ok: true,
    msg: `password changed to ${user.resetPassword}`,
    result: {},
  });
  */
};

export const forgotPassword = async (_req: Request, _res: Response) => {
  /*
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: "User not found",
      result: {},
    });
  }

  const init = crypto.randomBytes(32).toString("hex");
  const code = crypto.randomBytes(64).toString("hex");
  const data = crypto.randomBytes(16).toString("hex");

  user = await User.findOneAndUpdate(
    { email },
    {
      resetPassword: {
        token: `${init}${code}${data}`,
        expires: Date.now() + 3600000,
      },
    }
  );

  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${email}`,
    subject: "yourcareconnects-app password recovery",
    generateTextFromHTML: true,
    html: `<h3>Hola ${`${user.names} ${user.lastName}`}</h3>
    <div style="display:flex;justify-content:space-between">
      <div style="background-color:black;border-radius:10px;padding:20px;flex:1 0 20%;margin-right:20px;height:40px;text-align:center; width:120px" >
        <img src="https://yourcareconnects.com/wp-content/uploads/2023/08/cropped-your-care-connects-logo-letras-blancas-02-1024x501.png" alt="yourcareconnects logo" width="100px"/>
      </div>
      <div>
        <p style="margin:0px;">At <span>https://yourcareconnects.com/</span> we have received a request to reset your password. To reset your password please click on this button:
        <div style="margin: 64px;text-align: center">
          <a style="block:inline;border:1px solid #1a1a13;border-radius:5px;height:60px;padding:5px 25px;margin:120px;text-decoration:none;background:#fbd467;color:#1a1a13;font-family: arial, sans-serif;font-size: 1em;line-height:1em;white-space: nowrap" href="https://app.yourcareconnects.com/auth/change-password/${init}/${code}/${data}">Reset your password</a>
        </div>
        
        <p>or copy and paste this link in your browser</p>
        <br/>
        <p>Have a nice day</p>
        <br/>
        <br/>
        Yourcareconnects Support Team
      </div>
    </div>
    `,
  };

  await sendEmail(mailOptions);

  return res.status(200).json({
    ok: true,
    msg: `password changed to ${`https://app.yourcareconnects.com/reset/${init}/${code}/${data}`}`,
    result: {},
  });
  */
};
