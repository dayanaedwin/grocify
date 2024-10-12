import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, SignUp, AppLayout, Home, Products, ProductDetails, Checkout, Account, OrderDetails } from './pages';
import { OrderList, Profile } from './components';
import { RouteConstants } from './constants';
import { RootState } from './store';

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
					<Route path={RouteConstants.profile} element={<Account children={<Profile />} />} />
					<Route path={RouteConstants.orders} element={<Account children={<OrderList />} />} />
					<Route path={RouteConstants.order_details} element={<OrderDetails />} />
					<Route path={RouteConstants.checkout} element={<Checkout />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to={RouteConstants.root} />} />
		</Routes >
	);
}

const ProtectedRoutes = () => {
	const { token } = useSelector((state: RootState) => state.auth);
	return token ? <Outlet /> : <Navigate to={RouteConstants.login} />
}

export default App;