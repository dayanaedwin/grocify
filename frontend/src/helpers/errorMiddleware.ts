import { Middleware } from 'redux';
import { logout } from '../slices';

export const errorMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.error && [401, 403].includes(action.error.status)) {
        store.dispatch(logout());
    }

    return next(action);
};
