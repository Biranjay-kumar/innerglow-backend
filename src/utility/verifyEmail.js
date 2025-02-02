import User from "../src/models/userModel.js";

export const verifyEmail = async (req, res) => {
	try {
	  const { token } = req.params;
	//   console.log("token",token);
		console.log("chlo yaha to aa gya")
	  // Find the user with the matching verification token
	  const user = await User.findOne({ verificationToken: token });

	  console.log("userrr",user);
  
	  // If no user is found, return an error response
	  if (!user) {
		return res.status(400).json({ message: 'Invalid or expired verification token' });
	  }
  
	  // Mark the user's account as verified and remove the verification token
	  user.isVerified = true;
	  user.verificationToken = undefined; // Remove the token after verification
	  await user.save();
	//   console.log(process.env.FRONT_END_URL);
	  
	  // Return a success response
	  res.redirect(`${process.env.FRONT_END_URL}/user/login`);
	//   res.status(200).json({ message: 'Account successfully verified' });
	} catch (error) {
	  // Log and return a server error response in case of any unexpected errors
	//   console.error("Error verifying email:", error);
	  res.status(500).json({ message: 'An error occurred while verifying the account' });
	}
  };
  