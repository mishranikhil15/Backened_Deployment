const jwt=require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    const new_token=token.split(" ")[1]
    if(new_token){
        const decoded=jwt.verify(new_token,"masai")
        const userID=decoded.userID
        if(decoded){
            req.body.userID=userID
            next()
        }else{
            res.send("Please Login First")
        }
    }else{
        res.send("Please Login")
    }
}

module.exports={
    authenticate
}