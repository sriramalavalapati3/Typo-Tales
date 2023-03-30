
const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String,required:true},
    pass:{type:String,required:true},
	c_pass :{type:String,required:true},
    mob:{type:Number},
	role:{
		type:String,
		required:true,
		default:"guest",
		enum:["guest","user","admin"]
	}

})

  const UserModel=mongoose.model("User",userSchema)
  module.exports={UserModel}