var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport =require("passport")
const {UserModel}=require("../models/userModel")
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
async function(accessToken, refreshToken, profile, cb) {
    const email= profile._json.email
	const user= new UserModel({
		email,
		pass:uuidv4(),
		c_pass:uuidv4(),
		name:profile.displayName,
        avatar:profile.photos[0].value
	})
	await user.save()
	// const {_id,pass,c_pass,name}= user;
	//  const payload={
	// 	email,
	// 	_id,
    //     pass,
    //     c_pass,
    //     name
	//  }
	return cb(null,payload)
	console.log(profile)
  }
  
));


//  passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:8080/auth/google/callback"
//   },
//  async function(accessToken, refreshToken, profile, cb) {
//     const email = profile._json.email;
//     const user = new UserModel({
// 		email,
// 		pass: uuidv4(),
// 		c_pass: uuidv4(),
// 		name: profile.displayName,
// 		avatar: profile.photos[0].value
// 	  });
	  
// 	  user.save().then(savedUser => {
// 		return cb(null, savedUser);
// 	  }).catch(err => {
// 		return cb(err);
// 	  });
//   }
// ));

module.exports=passport