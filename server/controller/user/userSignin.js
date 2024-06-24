import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import userModel from "../../models/userModel.js";

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All details" });
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const validPassword =await bcrypt.compare(password,user.password);

    if (!validPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }
    if(validPassword)
      {
        const tokenData={
          _id:user._id,
          email:user.email
        };
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1h"});
        res.cookie("token",token,{httpOnly:true,secure:true}).json({message:"Login Success",data:token,success:true,error:false})
      }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userSignin;
