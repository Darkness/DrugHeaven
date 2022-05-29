import Main from './pages/main/main'
import Contact from './pages/contact/contact'
import Terms from './pages/terms/terms'
import Cart from './pages/cart/cart'
import Checkout from './pages/checkout/checkout'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Details from './pages/details/details'
import Admin from './pages/admin/admin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect} from 'react'
import {getToken,getUser} from './redux/userSlice'
import {useDispatch,useSelector} from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	const {isLogged,token,user} = useSelector(state => ({...state.user}))

	useEffect(() => {
		if(isLogged){
			dispatch(getToken())
		}
	},[dispatch,isLogged])

	useEffect(() => {
		if(token) {
			dispatch(getUser(token))
		}
	},[dispatch,token])

	return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/terms" element={<Terms />} />
			<Route path="/cart" element={isLogged ? <Cart /> : <Main/>} />
			<Route path="/deposit" element={isLogged ? <Checkout /> : <Main/>} />
			<Route path="/login" element={!isLogged ? <Login /> : <Main/>} />
			<Route path="/register" element={!isLogged ? <Register /> : <Main/>} />
			<Route path="/details/:id" element={<Details />} />
			<Route path="/admin" element={user && user.isAdmin ? <Admin /> : <Main/>} />
		</Routes>
	</BrowserRouter>
);
}

export default App