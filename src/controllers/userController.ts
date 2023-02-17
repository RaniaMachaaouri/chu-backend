import { Request, Response, NextFunction } from "express";
import users from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const existUser = await users.findOne({ email });
    if (existUser) {
      return res.status(404).json({
        message: `User already exist with this email ${email}!`,
      });
    }
    const user = await users.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      userType,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const existUser = await users.findOne({ email });
  console.log(existUser);
  if (!existUser) {
    return res.status(404).json({
      message: `User ${email} not found!`,
    });
  }
  console.log(existUser.password);
  if (await bcrypt.compare(password, existUser.password)) {
    const token = jwt.sign({}, "secret");

    if (res.status(201)) {
      return res.json({
        message: "Login successfuly",
        data: token,
      });
    } else {
      return res.json({
        message: "something went wrong..",
      });
    }
  }
  res.status(404).json({
    message: "Invalid Password",
  });
};

export default { register, login };
