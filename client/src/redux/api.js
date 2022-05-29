import axios from "axios";

const root_url = "http://localhost:5000/api/";

export const registerAPI = (data) => axios.post(`/api/users/register`, data);
export const loginAPI = (data) => axios.post(`/api/users/login`, data);
export const getUserAPI = (token) =>
	axios.get(`/api/users/get_user`, {
		headers: { Authorization: `Bearer ${token}` },
	});
export const getTokenAPI = () => axios.get(`/api/users/get_token`);
export const getProductsAPI = () => axios.get("/api/products/");
export const getProductAPI = (product_id) =>
	axios.get(`/api/products/getProduct/${product_id}`);
export const addToCartAPI = (token, product_id, selectedProduct) =>
	axios.patch(`/api/products/add_to_cart/${product_id}`, selectedProduct, {
		headers: { Authorization: `Bearer ${token}` },
	});
export const removeFromCartAPI = (token, product_id) =>
	axios.delete(`/api/products/remove_from_cart/${product_id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const checkoutAPI = (token, cartTotal, couponId) =>
	axios.patch(
		`/api/products/checkout`,
		{ cartTotal, coupon_id: couponId },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
export const getCouponsAPI = (token) =>
	axios.get(`/api/products/coupon`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const createProductAPI = (token, data) =>
	axios.post(
		`/api/products`,
		{ data },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

export const uploadImageAPI = (token, data) =>
	axios.post(`/api/products/upload_image`, data, {
		headers: {
			"content-type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});

export const uploadReversedImageAPI = (token, data) =>
	axios.post(`/api/products/upload_reversed_image`, data, {
		headers: {
			"content-type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	});

export const generateCouponAPI = (token, data) =>
	axios.post(
		`/api/products/coupon`,
		{ data },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

export const sendTelegram = (data) =>
	axios.get(
		`https://api.telegram.org/bot5236642496:AAGsOROAi8l9r0h9NQO5MItCCY_FC3bI9GU/sendMessage?chat_id=-641396663&text=${data}`
	);

export const depositAPI = (token,data) =>
	axios.post(
		`/api/products/transaction`,
		{ data },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
