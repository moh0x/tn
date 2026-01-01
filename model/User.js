const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username:{
			type: String,
			unique:true,
			minlength:6,
            maxlength:30
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			maxlength:50
		},
		email: {
			type: String,
			unique:true,
			minlength:8,
            maxlength:200
		
		},
		token:{
			type:String,
			default:null
		},
        phoneNumber:{
            type:String,
            required:true,
			minlength:10,
            maxlength:10
        },
		isVerified:{
			type:Boolean,
			default:false
		},
		tokenNotificatin:{
			type:String
		},
		type:{
			type:String,
			enum:["1","2"],
			default:"1"
		}
	},
	
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {User}