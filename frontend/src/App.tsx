import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Login, SignUp, AppLayout, Home, Products, ProductDetails, Checkout, Account, OrderDetails } from './pages';
import { ChangePassword, OrderList, Profile } from './components';
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
					<Route path={RouteConstants.account} element={<Account />} >
						<Route path={RouteConstants.profile} element={<Profile />} />
						<Route path={RouteConstants.orders} element={<OrderList />} />
						<Route path={RouteConstants.change_password} element={<ChangePassword />} />
					</Route>
					<Route path={RouteConstants.order_details} element={<OrderDetails />} />
					<Route path={RouteConstants.checkout} element={<Checkout />} />
				</Route>
			</Route>
		</Routes >
	);
}

const ProtectedRoutes = () => {
	const auth = { token: true }
	return (auth && auth.token) ? <Outlet /> : <Navigate to={RouteConstants.login} />
}

export default App;