import ErrorResponse from '../utils/ErrorResponse.js'
import User from '../models/userModel.js'

const checkAdmin = async (req,res,next) => {
	try{
		const user = await User.findById(req.user._id)
		if(!user.isAdmin) return next(new ErrorResponse('Not authorized for admin recources',400))
		next() 
	}catch(error){
		return next(error)
	}
}

export default checkAdmin