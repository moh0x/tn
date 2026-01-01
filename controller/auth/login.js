const {User} = require('../../model/User')
const httpStatus = require('../../constants/http_status')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

const signUp =async(req,res)=>{
    try {
        const valid = validationResult(req)
        if (!valid.isEmpty()) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
        }
        const {fullname,password,phoneNumber,cartGris,permis,drivingLicence,chaque,isAssurance,matricule,addresse,date,baladiya,onwan} = req.body      
        const user = await User.findOne({phoneNumber:phoneNumber});
        if (user) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":"user already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password,salt)
        const token = jwt.sign({phoneNumber:phoneNumber,fullname:fullname},"token")
        const newUser = new User({
          username:fullname,
            fullname:fullname,
            password:hashPassword,
            token:token,
            phoneNumber:phoneNumber,
            cartGris:cartGris,
            permis:permis,
            chaque:chaque,
            drivingLicenece:drivingLicence,
            isAssurance:isAssurance,
		matricule:matricule,
		city:addresse,
		date:date,
    baladiya:baladiya,
    onwan:onwan
        })
        await newUser.save()  
              res.status(200).json({"status":httpStatus.SUCCESS,"data":newUser})     
    } catch (error) {
        console.log(error);
          res.status(400).json({"status":httpStatus.ERROR,"message":"error"})  
    }
}
const login =async(req,res)=>{
  try {
    const{email,password} = req.body
  const user = await User.findOne({email:email},{__v:false});
 const valid = validationResult (req);

if (valid.isEmpty()) {
if (user) {
   
 const passwordMatch = await bcrypt.compare(password,user.password);
    if (passwordMatch == true) {
            const userRet = await User.findOne({email : email},{__v:false,password:false});
            res.status(200).json({"status":httpStatus.SUCCESS,"data":userRet});
        
    } else {
        res.status(401).json({"status":httpStatus.FAIL,"data":null,"message":"password not match"});
    }
   } else {
    res.status(403).json({"status":httpStatus.FAIL,"data":null,"message":"there is no user with this email"});
   }
} else {
res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
}
 } catch (error) {
  console.log(error);
  
    res.status(500).json({"status":httpStatus.ERROR,"message":"error"});
 }

}

// const logout = async (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 0 });
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
// const updateProfile =  async (req, res) => {
// 	try {
// 		const token = req.headers.token;
//     const user = await User.findOne({token:token},{password:false})
//     const{logtitude,latitude,isOnline,status,email,isAssurance,city,fullname,date,matricule,baladiya,onwan} = req.body
//   await User.findByIdAndUpdate(user._id,{ 
//     $set:{
//       logtitude:logtitude,
//       latitude:latitude,
//       isOnline:isOnline ?? user.isOnline,
//       status:status ?? user.status,
//       email:email ?? user.email,
//       isAssurance:isAssurance ?? user.isAssurance,
//       city:city ?? user.city,
//       fullname:fullname ?? user.fullname,
// 	    date:date ??user.date,
// 	    matricule:matricule ??user.matricule,
//       baladiya:baladiya ?? user.baladiya,
//       onwan:onwan ?? user.onwan
//     }
//   })
//   await user.save()
//   res.status(200).json({"status":httpStatus.SUCCESS,"data":user})  
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
// const userInfo = async (req,res)=>{
//   try {
//     const token = req.headers.token;
//     const user = await User.findOne({token:token},{password:false})
//        res.status(200).json({"status":httpStatus.SUCCESS,"data":user})
    
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// const updateNotificationToken =  async (req, res) => {
// 	try {
// 		const token = req.headers.token;
//     const user = await User.findOne({token:token},{password:false})
//     const{tokenNotificatin} = req.body
//   await User.findByIdAndUpdate(user._id,{ 
//     $set:{
//       tokenNotificatin:tokenNotificatin
//     }
//   })
//   res.status(200).json({"status":httpStatus.SUCCESS,"data":user})  
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
// const deleteUser = async (req,res)=>{
//   try {
//     const token = req.headers.token;
//     const user = await User.findOne({token:token},{password:false})
//        await User.findByIdAndDelete(user._id); 
//        res.status(200).json({"status":httpStatus.SUCCESS,"data":null });
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }


module.exports = {login}