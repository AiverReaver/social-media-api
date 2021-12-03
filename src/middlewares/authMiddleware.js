import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(401).send({ error: "unauthorised" });
    }

    console.log(process.env.JWT_SECRET);
    const decodedToken = jwt.verify(tokenHeader, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch {
    return res.status(401).send({ message: "expired or invalid token" });
  }
};
