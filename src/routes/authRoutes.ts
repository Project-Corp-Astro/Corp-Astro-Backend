import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user.model";
import { validateLogin, validateRegister } from "../utils/validators";
import authMiddleware from "../middleware/authMiddleware";

const authrouter = express.Router();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "malay";
const SALT_ROUNDS = 10;

// Register a new user
authrouter.post("/register", async (req: any, res: any) => {
  try {
    // Validate request body
    const { error, value } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, role } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = await User.create({
      name: username,
      email: email,
      password: passwordHash, // Change 'passwordHash' to 'password'
      role: role || "end-user", // Default role is "end-user"
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.userId, role: newUser.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: newUser.userId,
        username: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login a user
authrouter.post("/login", async (req: any, res: any) => {
  try {
    // Validate request body
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return response
    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.userId,
        username: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout a user (invalidate token)
authrouter.post("/logout", async (req: Request, res: Response) => {
  try {
    // Invalidate the token (optional: store invalidated tokens in a blacklist)
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Get current user (protected route)
// authrouter.get("/me", authMiddleware, async (req: any, res: any) => {
//   try {
//     // Fetch user details from the database
//     const user = await User.findByPk(req.user.userId, {
//       attributes: { exclude: ["passwordHash"] }, // Exclude sensitive data
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Return user details
//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

export default authrouter;