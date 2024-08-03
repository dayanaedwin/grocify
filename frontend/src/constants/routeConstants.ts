const RouteConstants: routeConstantsType = {
    root: '/',
    login: '/login',
    sign_up: '/sign-up',
    products: '/products',
    product_details: '/products/:id',
    account: '/account',
    profile: '/account/profile',
    orders: '/account/orders',
    orders_root: '/orders',
    order_details: '/orders/:id',
    checkout: '/checkout',
}

type routeConstantsType = {
    root: string,
    login: string,
    sign_up: string,
    products: string,
    product_details: string,
    account: string
    profile: string,
    orders: string,
    orders_root: string,
    order_details: string,
    checkout: string,
}

export { RouteConstants };