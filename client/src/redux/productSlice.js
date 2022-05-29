import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

export const getProducts = createAsyncThunk(
	"products/get",
	async (rejectWithValue) => {
		try {
			let { data } = await api.getProductsAPI();
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const getProduct = createAsyncThunk(
	"products/getProduct",
	async (product_id, { rejectWithValue }) => {
		try {
			let { data } = await api.getProductAPI(product_id);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const addProductToCart = createAsyncThunk(
	"products/addProductToCart",
	async ({ token, product_id, selectedProduct }, { rejectWithValue }) => {
		try {
			let { data } = await api.addToCartAPI(
				token,
				product_id,
				selectedProduct
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const addProduct = createAsyncThunk(
	"products/createProduct",
	async ({token,product}, { rejectWithValue }) => {
		try {
			let { data } = await api.createProductAPI(token,product);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const removeProductFromCart = createAsyncThunk(
	"products/removeProductFromCart",
	async ({ token, product_id }, { rejectWithValue }) => {
		try {
			let { data } = await api.removeFromCartAPI(token, product_id);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const attachImage = createAsyncThunk(
	"products/attachImage",
	async ({ token, formData }, { rejectWithValue }) => {
		try {
			let { data } = await api.uploadImageAPI(token, formData);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const attachReversedImage = createAsyncThunk(
	"products/attachReversedImage",
	async ({ token, formData }, { rejectWithValue }) => {
		try {
			let { data } = await api.uploadReversedImageAPI(token, formData);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		product: {},
		error: null,
		success: null,
		imageURL: null,
		reversedImageURL: null,
	},
	reducers: {
		clearDetails: (state, { payload }) => {
			state.product = {};
		},
		clearStatus: (state, { payload }) => {
			state.error = null;
			state.success = null;
		},
	},
	extraReducers: {
		[getProducts.fulfilled]: (state, { payload }) => {
			state.products = payload.payload;
			state.error = null;
		},
		[getProducts.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getProduct.fulfilled]: (state, { payload }) => {
			state.product = payload.payload;
		},
		[getProduct.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[addProductToCart.fulfilled]: (state, { payload }) => {
			state.success = payload.message;
			state.error = null;
		},
		[addProductToCart.rejected]: (state, { payload }) => {
			state.success = null;
			state.error = payload;
		},
		[removeProductFromCart.fulfilled]: (state, { payload }) => {
			state.success = payload.message;
			state.error = null;
		},
		[removeProductFromCart.rejected]: (state, { payload }) => {
			state.success = null;
			state.error = payload;
		},
		[addProduct.fulfilled]: (state, {payload}) => {
			state.success = payload.message
			state.products.push(payload.payload)
			state.error = null
		},
		[addProduct.rejected]: (state, {payload}) => {
			state.success = null
			state.error = payload.detailed
		},
		[attachImage.fulfilled]: (state, {payload}) => {
			state.error = null
			state.imageURL = payload.payload
		},
		[attachImage.rejected]: (state, {payload}) => {
			state.error = payload
			state.reversedImageURL = null;
		},
		[attachReversedImage.fulfilled]: (state, {payload}) => {
			state.error = null
			state.reversedImageURL = payload.payload
		},
	},
});

export const { clearDetails, clearStatus } = productsSlice.actions;

export default productsSlice.reducer;
