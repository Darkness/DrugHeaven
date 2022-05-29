import ErrorResponse from '../utils/ErrorResponse.js'
import User from '../models/userModel.js'
import JWT from 'jsonwebtoken'

const userController = {
	register: async (req,res,next) => {
		try{
			const {username,email,password} = req.body
			if(!username && !email && !password) 
				return next(new ErrorResponse('Fill the form',400))

			const user = await User.create({username,email,password})
			const token = user.createToken()
			user.createCookie(res,token)

			res.status(200).json({
				message: 'User succesfully registered',
				payload: user
			})
		}catch(error){
			return next(error)
		}
	},
	getToken: async (req,res,next) => {
		try{
			const {token} = req.cookies
			if(!token) return next(new ErrorResponse('Could not verify token',400))
			const decodedToken = JWT.verify(token, process.env.JWT_SECRET)
			const user = await User.findById(decodedToken)
			if(!user) return next(new ErrorResponse('Could not find user with given id',400))

			const newToken = user.createToken()
			res.status(200).json({
				message: 'Succesfully granted token',
				payload: newToken
			})
		}catch(error){
			return next(error)
		}
	},
	login: async (req,res,next) => {
		try{	
			const {loginType,password} = req.body
			if(!loginType && !password){
				return next(new ErrorResponse('Fill the form',400))
			}else if(!password){
				return next(new ErrorResponse('Enter the password',400))
			}else if(!loginType){
				return next(new ErrorResponse('Enter username or email',400))
			}

			let user = await User.findOne({username: loginType}).select('+password')
			if(!user) {
				user = await User.findOne({email: loginType}).select('+password')
				if(!user) {
					return next(new ErrorResponse('User is not registered'))
				}
			}
			let isMatch = await user.comparePasswords(password)
			if(!isMatch) return next(new ErrorResponse('Wrong password',400))

			let token = user.createToken()
			user.createCookie(res,token)

			res.status(200).json({message: 'User succesfully loggined', payload: user})
		}catch(error){
			console.log(error)
		}
	},
	getUser: async (req,res,next) => {
		try{
			const user = await User.findById(req.user._id).populate('cart')
			res.status(200).json({message: 'Succesfully got user data',payload: user})
		}catch(error){
			return next(error)
		}
	}
}

export default userController