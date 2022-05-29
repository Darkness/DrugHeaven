import mongoose from 'mongoose'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Enter your username'],
		unique: [true, "Username already taken"],
		trim: true,
		minlength: [2, 'Username should be atleast 2 characters long'],
		maxlength: [15, 'Username should not be more than 15 characters long']
	},
	email: {
		type: String,
		required: [true, 'Enter your email'],
		unique: [true, "Email already taken"],
		trim: true,
		maxlength: [30, 'Email should not be more than 30 characters long'],
		match:  [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Email should be valid",
		],
	},
	password: {
		type: String,
		required: [true, 'Enter your password'],
		trim: true,
		select: false,
		minlength: [8, 'Password should be atleast 8 characters long'],
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	cart: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	}],
	wallet: {
		type: Number,
		default: 0
	},
	discord: {
		type: String
	}
})

UserSchema.pre('save', async function (next) {
	if(!this.isModified('password')){
		next()
	}
	const salt = await bcrypt.genSalt(4)
	this.password = await bcrypt.hash(this.password,salt)
	next()
})

UserSchema.methods.createToken = function () {
	return JWT.sign({_id: this._id}, process.env.JWT_SECRET, {
		expiresIn: '7d'
	})
}

UserSchema.methods.createCookie = function (res,token) {
	return res.cookie('token', token, {
		'path': '/api/users/get_token',
		'httpOnly': true,
		'maxAge': 1000 * 60 * 60 * 24 * 7
	})
}

UserSchema.methods.comparePasswords = async function(password) {
	return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('Users', UserSchema)

export default User