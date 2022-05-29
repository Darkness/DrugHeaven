import mongoose from 'mongoose'

const TotalSalesSchema = new mongoose.Schema({
	amount: {
		type: Amount,
		required: true
	}
})

const Coupon = mongoose.model('Coupons', TotalSalesSchema)

export default Coupon