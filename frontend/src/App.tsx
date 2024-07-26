import { Routes, Route, Router, Outlet, Navigate } from 'react-router-dom';
import { Login, SignUp, AppLayout, Home, Products, ProductDetails, Cart, Orders, OrderDetails } from './pages';
import { RouteConstants } from './constants';

const App = () => {
	return (
		<Routes>
			<Route path={RouteConstants.login} element={<Login />} />
			<Route path={RouteConstants.sign_up} element={<SignUp />} />
			<Route element={<ProtectedRoutes />}>
				<Route path={RouteConstants.root} element={<AppLayout />} >
					<Route index element={<Home />} />
					<Route path={RouteConstants.products} element={<Products />} />
					<Route path={RouteConstants.product_details} element={<ProductDetails />} />
					<Route path={RouteConstants.orders} element={<Orders />} />
					<Route path={RouteConstants.order_details} element={<OrderDetails />} />
					<Route path={RouteConstants.cart} element={<Cart />} />
				</Route>
			</Route>
		</Routes >
	);
}

const ProtectedRoutes = () => {
	const auth = { token: false }
	return (auth && auth.token) ? <Outlet /> : <Navigate to={RouteConstants.login} />
}

export default App;