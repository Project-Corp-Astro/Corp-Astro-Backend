import express, { Request, Response } from "express";
import Employee from "../db/models/employee.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const employeeRoutes = express.Router();

// Create Employee API
employeeRoutes.post("/CreateEmployee", async (req: any, res: any) => {
  try {
    const { empId, name, email, password } = req.body;

    // Validate input
    if (!empId || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if empId is already in use
    const existingEmployeeById = await Employee.findOne({ where: { empId } });
    if (existingEmployeeById) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // Check if email is already in use
    const existingEmployeeByEmail = await Employee.findOne({ where: { email } });
    if (existingEmployeeByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const newEmployee = await Employee.create({
      empId,
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});




// Login API
employeeRoutes.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { empId: employee.empId, email: employee.email },
      process.env.JWT_SECRET as string,  // Ensure JWT_SECRET is defined
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});


export default employeeRoutes;
