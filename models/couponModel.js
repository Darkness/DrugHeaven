import mongoose from 'mongoose'

const CouponSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	power: {
		type: Number
	}
})

const Coupon = mongoose.model('Coupons', CouponSchema)

export default Coupon