import jwt from "jsonwebtoken";
const authToken = async (req, res, next) => {
  try {
    const token = await req.cookies?.token;
    if (!token) {
      return res
        .status(200)
        .json({ message: "Please Login...", sucess: false, error: true });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      //console.log(err);
      //console.log(decoded);
      if (err) {
        console.log("error", err);
      }
      req.userId = decoded?._id;
      next();
    });
    //console.log("token",token)
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export default authToken;
