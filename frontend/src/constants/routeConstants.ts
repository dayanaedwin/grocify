const RouteConstants: routeConstantsType = {
    root: '/',
    login: '/login',
    sign_up: '/sign-up',
    products: '/products',
    product_details: '/products/:id',
    orders: '/orders',    
    order_details: '/orders/:id',
    cart: '/cart',
}

type routeConstantsType = {
    root: string,
    login: string,
    sign_up: string,
    products: string,
    product_details: string,
    orders: string,
    order_details: string,
    cart: string,
}

export { RouteConstants };