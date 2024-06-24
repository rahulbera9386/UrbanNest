import userModel from './../../models/userModel.js';

const userDetailsdController=async (req,res)=>{

try{

// console.log("userId",req.userId)

const user=await userModel.findById(req.userId);
res.status(200).json({
    data:user,
    success:true,
    error:false,
    message:"User Details"
})
}
catch(err)
{
    return res.status(400).json({message:err.message,error:true,success:false})
}
}


export default userDetailsdController;