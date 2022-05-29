import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

export const register = createAsyncThunk(
	"user/register",
	async (payload, { rejectWithValue }) => {
		try {
			const { data } = await api.registerAPI(payload);
			localStorage.setItem("isLogged", true);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const login = createAsyncThunk(
	"user/login",
	async (payload, { rejectWithValue }) => {
		try {
			const { data } = await api.loginAPI(payload);
			localStorage.setItem("isLogged", true);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const getCoupons = createAsyncThunk(
	"user/getCoupons",
	async (token,{rejectWithValue}) => {
		try {
			const { data } = await api.getCouponsAPI(token);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const getUser = createAsyncThunk(
	"user/get_user",
	async (token, { rejectWithValue }) => {
		try {
			const { data } = await api.getUserAPI(token);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const getToken = createAsyncThunk(
	"user/get_token",
	async (rejectWithValue) => {
		try {
			const { data } = await api.getTokenAPI();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const transaction = createAsyncThunk(
	"user/transaction",
	async ({ token, payload,email }, { rejectWithValue }) => {
		try {
			let { data } = await api.depositAPI(token, {payload,email});
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
		isLogged: JSON.parse(localStorage.getItem("isLogged")),
		token: null,
		error: null,
		success: null,
		cartTotal: 0,
		cartTotalProducts: 0,
		coupons: [],
		checkoutURL: ''
	},
	reducers: {
		clearStatus: (state, { payload }) => {
			state.error = null;
			state.success = null;
		},
		removeItemFromCart: (state, { payload }) => {
			state.user.cart.map((cartItem, index) => {
				if (payload._id === cartItem._id) {
					state.user.cart.splice(index, 1);
				}
			});
		},
		addItemToCart: (state, { payload }) => {
			let add = true;
			state.user.cart.map((cartItem, index) => {
				if (payload.product._id === cartItem._id) {
					state.error = "Item is already in the cart";
					state.success = null;
					add = false;
				}
			});
			if (add) {
				Object.assign(
					{},
					payload.product.chosenProduct,
					payload.selectedProduct
				);
				state.user.cart.push(payload.product);
				state.error = null;
				state.success = "Added product to the cart";
			}
		},
		calcCartTotal: (state, { payload }) => {
			let count = 0;
			let countTotalProducts = 0;
			state.user.cart.map((cartItem) => {
				count += cartItem.chosenProduct.price;
				countTotalProducts += 1;
			});

			state.cartTotal = count;
			state.cartTotalProducts = countTotalProducts;
		},
		checkout: (state, { payload }) => {
			if (state.user.wallet >= state.cartTotal) {
				state.success = "Succesfully purchased products";
				state.error = null;
				state.user.wallet -= state.cartTotal;
				state.user.cart.forEach((cartItem) => {
					state.user.cart.shift();
				});
				state.user.cart.shift();
			} else {
				state.error = "Not enough money on wallet";
				state.success = null;
			}
		},
		checkCoupon: (state, { payload }) => {
			state.cartTotal = state.cartTotal - (state.cartTotal * payload.power) / 100
			state.coupons.map((coupon,index) => {
				if (coupon.name === payload.name) {
					state.coupons.splice(index,1)
				}
			})
		},
	},
	extraReducers: {
		[register.fulfilled]: (state, { payload }) => {
			state.isLogged = JSON.parse(localStorage.getItem("isLogged"));
			state.success = payload.message;
			state.error = null;
		},
		[register.rejected]: (state, { payload }) => {
			if (payload.detailed && payload.detailed.length > 0) {
				state.error = payload.detailed;
			} else {
				state.error = payload;
			}
		},
		[login.fulfilled]: (state, { payload }) => {
			state.isLogged = JSON.parse(localStorage.getItem("isLogged"));
			state.success = payload.message;
			state.error = null;
		},
		[login.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getUser.fulfilled]: (state, { payload }) => {
			state.user = payload.payload;
			state.error = null;
		},
		[getUser.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getToken.fulfilled]: (state, { payload }) => {
			state.token = payload.payload;
			state.error = null;
		},
		[getToken.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getCoupons.fulfilled]: (state, { payload }) => {
			state.coupons = payload.payload
		},
		[transaction.fulfilled]: (state, { payload }) => {
			state.error = null;
			state.checkoutURL = payload.response.checkout_url
		},
		[transaction.rejected]: (state, { payload }) => {
			state.error = payload;
			state.checkoutURL = ''
		},

	},
});

export const {
	clearStatus,
	removeItemFromCart,
	addItemToCart,
	calcCartTotal,
	checkout,
	checkCoupon,
} = userSlice.actions;

export default userSlice.reducer;
