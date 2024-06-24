import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js";

const userSignUp = async (req, res) => {
  try {
    const { fullName, email, password, profileImg } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide All Details" });
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      ...req.body,
      fullName,
      email,
      password: hashedPassword,
      profileImg,
      role: "General",
    };

    const userData = new userModel(payload);
    const data = await userData.save();

    return res
      .status(201)
      .json({ success: true, message: "User created successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userSignUp;
