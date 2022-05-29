import express from 'express'
import userController from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

const {register,getToken,login,getUser} = userController


router.route('/register').post(register)
router.route('/get_token').get(getToken)
router.route('/login').post(login)
router.route('/get_user').get(auth,getUser)

export default router