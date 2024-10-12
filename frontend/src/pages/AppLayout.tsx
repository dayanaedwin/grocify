import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLoggedUser } from "../thunks"
import { AppDispatch, RootState } from "../store"


export const AppLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchLoggedUser = async () => {
            if (!user.user) {
                dispatch(getLoggedUser());
            }
        }

        fetchLoggedUser();
    }, [dispatch]);

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}