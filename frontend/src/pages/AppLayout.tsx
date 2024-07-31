import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components"


export const AppLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}