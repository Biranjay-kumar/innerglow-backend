import User from "../models/userModel.js";

class UserRepository {
  async createUser(data) {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("Email is already registered.");
      }

      // Create and save the user
      const user = new User(data);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }

  async findUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error("Error finding user by ID: " + error.message);
    }
  }

  async updateUser(userId, data) {
    try {
      return await User.findByIdAndUpdate(userId, data, { new: true });
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }
}

export default new UserRepository();
