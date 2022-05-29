import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './userSlice.js'
import ProductReducer from './productSlice.js'

export default configureStore({
	reducer: {
		user: UserReducer,
		products: ProductReducer
	}
})