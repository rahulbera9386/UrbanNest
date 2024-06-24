import express from "express";
import userSignUp from "../controller/user/userSignUp.js";
import userSignin from "../controller/user/userSignin.js";
import authToken from "../middleware/authToken.js";
import userDetailsdController from "../controller/user/userDetails.js";



const router=express.Router();

router.post("/sign-up",userSignUp);
router.post('/sign-in',userSignin);
router.get("/user-details",authToken,userDetailsdController)


export default router;