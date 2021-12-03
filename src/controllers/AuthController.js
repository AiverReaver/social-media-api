import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import model from "../models/";

class AuthController {
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { email, password } = req.body;

      let user = await model.User.findOne({ where: { email } });
      if (!user)
        return res
          .status(400)
          .send({ message: "Either username or password is wrong" });

      const verifyPass = await bcryptjs.compare(password, user.password);
      if (!verifyPass)
        return res
          .status(400)
          .send({ message: "Either username or password is wrong" });

      const payload = { id: user.id, email: user.email };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          return res.status(200).send({ token, message: "Login Successfull" });
        }
      );
    } catch {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}

export const authController = new AuthController();
