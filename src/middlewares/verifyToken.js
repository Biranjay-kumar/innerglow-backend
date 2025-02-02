import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header is provided and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authorization token is missing or invalid" }); // Added a message for better clarity
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    // Verify the token and retrieve decoded payload
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("decoded", decoded)
    if(decoded.userId){
      req.userId = decoded.userId;
    }else{
      req.userId = decoded._id;
    }
    // console.log("userId", req.userId);

    next(); // Call next() to proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails, return a 403 error
    // console.log(authHeader)
    return res.status(403).json({ message: "Invalid token", error: err.message }); // Added better error message
  }
};

export default verifyToken;
