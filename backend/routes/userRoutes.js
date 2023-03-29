const express = require('express');
const jwt =require("jsonwebtoken")
const bcrypt= require("bcrypt")
const {authentication}= require("../middlewares/authentication")
const {UserModel}=require("./model/userModel")
const userRouter= express.Router()

userRouter.post("/register",async(req,res)=>{
	const {name,email,pass,age,mob,role}= req.body;
	const check= await UserModel.findOne({email})
	if(check){
		res.send({"msg":"User Already Register Please Login"})
	}else{
		try{
			bcrypt.hash(pass, 5,async(err, hash)=> {
				 if(err) res.send(err)
				 else{
					const user=new UserModel({name,email,pass:hash,age,mob,role})
				await  user.save()
					res.send(user)
				 }
			});
		}catch(err){
			res.send({"msg":"Something went wrong with register","error":err.message})
		}
	}
	})

	//login 


	userRouter.post("/login",async(req,res)=>{
		
		const {email,pass}=req.body;
		try{
			if(email=="admin" && pass=="admin"){
				const admin_token= jwt.sign({admin:"admin"}, process.env.admin_tokenKey,{ expiresIn: '1hr' })
				return res.send("welcome admin")
			}
			const user=await UserModel.findOne({email})
			if(user){
				bcrypt.compare(pass, user.pass, function(err, result) {
					// console.log(process.env.jwtnormalToken)
					if(result){
						var normal_token = jwt.sign({userID:user._id }, process.env.jwtnormalToken,{ expiresIn: '1hr' })
						var refresh_token = jwt.sign({userID:user._id }, process.env.jwtrefreshToken,{ expiresIn: '7d' })
					
					      
						res.send({"msg":"login sucessfull","normal_token":normal_token,"refresh_token":refresh_token})
					}else{
						res.send("wrong password")
					}
				})
			}else{
				res.send("Register first")
			}
		}catch(err){
			return res.send({"msg":"Something went wrong"})
		}
	})



	userRouter.get("/",authentication,(req,res)=>{
		res.send("this is my authentication page")
	})
	

     ///refresh

	userRouter.post("/refresh",async(req,res)=>{
		const refresh_token= req.headers.authorization;
		console.log(refresh_token)
        try{
			var decoded = jwt.verify(refresh_token,process.env.jwtrefreshToken)
			if(decoded){
				// console.log(decoded.userID)
				
				req.userID=decoded.userID
				// console.log(req.userID)
				const user=await  UserModel.findById(req.userID)
				if(!user){
					return res.json("Not authorised")
				}
				var token = jwt.sign({ userID:user._id },process.env.jwtnormalToken,{expiresIn:"1h"});
				res.json(token)

			}else{
				res.json("Please login first")
			}
		}catch(err){
			res.json(err.message)
		}
	})

	module.exports={userRouter}

