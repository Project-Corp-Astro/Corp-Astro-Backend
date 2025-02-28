import express, { Request, Response } from "express";
import Attendance from "../db/models/attendance.model";
import Employee from "../db/models/employee.model";
import axios from "axios";

const attendanceRoutes = express.Router();


// // POST: Employee Clock-In API
// attendanceRoutes.post("/clock-in",  async (req: any, res: any) => {
//   try {
//     const empId = (req as any).user.empId; // Get empId from token

//     if (!empId) {
//       return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
//     }

//     const { clockInTime, clockInLocation, clockInImage } = req.body;

//     // Validate required fields
//     if (!clockInTime || !clockInLocation || !clockInImage) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Ensure employee exists
//     const employee = await Employee.findByPk(empId);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Create Attendance record
//     const newAttendance = await Attendance.create({
//       empId,
//       clockInTime,
//       clockInLocation,
//       clockInImage,
//     });

//     return res.status(201).json({ message: "Clock-in successful", attendance: newAttendance });
//   } catch (error) {
//     console.error("Clock-in error:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// });

// Helper function to fetch location name from OpenStreetMap
const getLocationName = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    return response.data.display_name || "Unknown Location";
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Unknown Location";
  }
};

// POST: Employee Clock-In API
attendanceRoutes.post("/clock-in", async (req: any, res: any) => {
  try {
    const empId = req.user?.empId; // Get empId from token

    if (!empId) {
      return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
    }

    const { clockInTime, clockInLocation, clockInImage } = req.body;

    if (!clockInTime || !clockInLocation || !clockInImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [latitude, longitude] = clockInLocation.split(",").map(parseFloat);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid location coordinates" });
    }

    const locationName = await getLocationName(latitude, longitude);

    const employee = await Employee.findByPk(empId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newAttendance = await Attendance.create({
      empId,
      clockInTime,
      clockInLocation: { latitude, longitude, locationName },
      clockInImage,
    });

    return res.status(201).json({ message: "Clock-in successful", attendance: newAttendance });
  } catch (error) {
    console.error("Clock-in error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

// // POST: Employee Clock-Out API
// attendanceRoutes.post("/clock-out", async (req: any, res: any) => {
//   try {
//     const empId = (req as any).user.empId; // Get empId from token

//     if (!empId) {
//       return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
//     }

//     const { clockOutTime, clockOutLocation, clockOutImage } = req.body;

//     // Validate required fields
//     if (!clockOutTime || !clockOutLocation || !clockOutImage) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Ensure employee exists
//     const employee = await Employee.findByPk(empId);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Find the latest clock-in record for the employee
//     const attendance = await Attendance.findOne({
//       where: { empId },
//       order: [['clockInTime', 'DESC']],
//     });

//     if (!attendance) {
//       return res.status(404).json({ message: "No clock-in record found" });
//     }

//     // Update Attendance record with clock-out details
//     attendance.clockOutTime = clockOutTime;
//     attendance.clockOutLocation = clockOutLocation;
//     attendance.clockOutImage = clockOutImage;
//     await attendance.save();

//     return res.status(200).json({ message: "Clock-out successful", attendance });
//   } catch (error) {
//     console.error("Clock-out error:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// });

// POST: Employee Clock-Out API
attendanceRoutes.post("/clock-out", async (req: any, res: any) => {
  try {
    const empId = req.user?.empId; // Get empId from token

    if (!empId) {
      return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
    }

    const { clockOutTime, clockOutLocation, clockOutImage } = req.body;

    if (!clockOutTime || !clockOutLocation || !clockOutImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [latitude, longitude] = clockOutLocation.split(",").map(parseFloat);
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid location coordinates" });
    }

    const locationName = await getLocationName(latitude, longitude);

    const employee = await Employee.findByPk(empId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the latest clock-in record without clock-out
    const attendance = await Attendance.findOne({
      where: { empId, clockOutTime: null },
      order: [["clockInTime", "DESC"]],
    });

    if (!attendance) {
      return res.status(404).json({ message: "No active clock-in record found" });
    }

    // Update Attendance record with clock-out details
    attendance.clockOutTime = clockOutTime;
    attendance.clockOutLocation = { latitude, longitude, locationName };
    attendance.clockOutImage = clockOutImage;
    await attendance.save();

    return res.status(200).json({ message: "Clock-out successful", attendance });
  } catch (error) {
    console.error("Clock-out error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

export default attendanceRoutes;
