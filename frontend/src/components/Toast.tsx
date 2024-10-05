import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeToast } from '../slices';
import { getToastStyles } from '../helpers';

export const Toast = () => {
    const dispatch = useDispatch();
    const { toast } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                dispatch(removeToast());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full">
            {toast &&
                <div key={toast.id} className={`p-4 rounded shadow-md max-w-xs mx-auto ${getToastStyles(toast.type)}`}>
                    <p>{toast.message}</p>
                </div>
            }
        </div>
    );
};
