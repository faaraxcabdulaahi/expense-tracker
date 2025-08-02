import { Response, Request } from "express";
import { loginSchema, registerSchema } from "../validations/authValidation";
import { User } from "../model/userModel";
import { signJwt } from "../utils/jwtUtil";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.issues });

    const { name, email, password } = parsed.data;

    const emailExistence = await User.findOne({ email });
    if (emailExistence)
      return res.status(409).json({ message: "Email already exists" });

    const newUser = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User successfully created",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.issues });

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Password is not correct, try again" });

    const token = signJwt({ id: user._id.toString(), role: user.role });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred" });
  }
};
