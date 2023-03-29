const jwt= require("jsonwebtoken")
require('dotenv').config()
const authentication= async(req,res,next)=>{
const token= req.headers.authorization;
try{
	if(token ){
		var decoded = jwt.verify(token,process.env.jwtnormalToken )
		req.userID= decoded.userID
		//  console.log(decoded)
		//   console.log(decoded.userID)
		console.log(req.userID)
		next()
	
	}else{
		res.send("User Not Authorized")
	}
}catch(err){

res.send(err.message)
}
}
module.exports={
	authentication
}