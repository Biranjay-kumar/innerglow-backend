import bcrypt from "bcryptjs";

// Function to hash a plain text password
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

// Function to compare a plain text password with a hashed one
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    console.log("Plain Password:", plainPassword); // Log the plain password
    console.log("Hashed Password:", hashedPassword); // Log the hashed password
console.log("Code is coming in comparePassword");
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare password
    console.log("Password Match:", isMatch); // Log the result of the comparison
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};
