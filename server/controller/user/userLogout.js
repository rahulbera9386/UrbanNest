const userLogout=async(req,res)=>{
try{
res.clearCookie("token");
res.status(200).json({
    success:true,
    error:false,
    message:"Logged Out SuccessFully"
})
}
catch(err)
{
    res.status(500).json({
        success:false,
        error:true
    })

}
}

export default userLogout;