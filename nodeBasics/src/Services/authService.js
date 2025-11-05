import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const otpCode = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    otps: { code: otpCode, expiresAt: otpExpiry },
  });

  await sendEmail(email, "Verify your email", `Your OTP is ${otpCode}`);
  return user;
};

export const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.otps.code !== otp) throw new Error("Invalid OTP");
  if (user.otps.expiresAt < new Date()) throw new Error("OTP expired");

  user.isVerified = true;
  user.otps = undefined;
  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  if (!user.isVerified) throw new Error("Email not verified");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};
