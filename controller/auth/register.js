const {User} = require('../../model/User')
const httpStatus = require('../../constants/http_status')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const register =async(req,res)=>{
    try {
        const valid = validationResult(req)
        if (!valid.isEmpty()) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
        }
        const {username,password,phoneNumber,email,type} = req.body      
        const user = await User.findOne({$or:[{phoneNumber:phoneNumber},{email:email}]});
        if (user) {
          return  res.status(401).json({"status":httpStatus.FAIL,"data":null,"message":"user already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password,salt)
        const token = jwt.sign({email:email,phoneNumber:phoneNumber},"token")
        const newUser = new User({
          username:username,
            password:hashPassword,
            token:token,
            phoneNumber:phoneNumber,
            email:email
           
        })
        await newUser.save()  
              res.status(200).json({"status":httpStatus.SUCCESS,"data":newUser})     
    } catch (error) {
console.log(error);

          res.status(500).json({"status":httpStatus.ERROR,"message":"error"})  
    }
}
module.exports = {register}