import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV !== "production", // Secure in production (HTTPS)
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;