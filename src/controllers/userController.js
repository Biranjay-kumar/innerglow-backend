import User from "../models/userModel.js";
import UserService from "../services/userService.js";
import jwt from "jsonwebtoken";
import { verifyOtp } from "../utility/otpAgencyUtility.js";
import userService from "../services/userService.js";

class UserController {
  async register(req, res, next) {
    const { name, email, password, dob } = req.body;
    console.log(dob);
    const enrollmentMonth = 0;
    // Validate DOB format
    const dobParts = dob.split("/"); // Assuming the format is d/m/y
    if (dobParts.length !== 3) {
      return next(new Error("Invalid date of birth format. Please use d/m/y"));
    }

    const [day, month, year] = dobParts.map(Number);

    // Check for valid date values
    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      month < 1 ||
      month > 12 ||
      year < 1900
    ) {
      return next(new Error("Invalid date of birth values"));
    }

    const birthDate = new Date(year, month - 1, day); // Convert to a Date object

    // Ensure birthDate is a valid date
    if (isNaN(birthDate.getTime())) {
      return next(new Error("Invalid date of birth provided"));
    }

    // If age is not within the valid range, it will be validated by the schema
    try {
      const newUser = await UserService.registerUser({
        name,
        email,
        password,
        dob: birthDate,
        enrollmentMonth,
      });
      

      return res.status(201).json({
        success: true,
        message: "Welcome to our platform",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // Call getUserByEmail and pass the email and password for validation
      const user = await UserService.loginUser(email, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      console.log("user : ", user);
      const JWT_SECRET = process.env.JWT_SECRET;
      // Token generation logic (assuming JWT)
      const token = jwt.sign(
        {
          userId: user.data._id,
        },
        JWT_SECRET, 
        { expiresIn: "1h" } 
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      next(error); 
    }
  }

  async updateUser(req, res, next) {
    const userId  = req.userId;
    const data = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, data);
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error); 
    }
  }

  async deleteUser(req, res, next) {
    const { userId } = req.params;

    try {
      const deletedUser = await UserService.deleteUser(userId);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      next(error); 
    }
  }

  async verifyUser(req, res, next) {
    const { email, otp } = req.body;
    try {
      const verifyUser = await userService.verifyUser(email, otp);
      return res.status(200).json({
        success: true,
        message: "User verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
