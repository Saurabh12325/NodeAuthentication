import * as authService from "../Services/authService.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ message: "User registered, please verify OTP", user });
  } catch (err) {
    next(err);
  }
};

export const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await authService.verifyOtp(email, otp);
    res.json({ message: "Email verified successfully", user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);
    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
