import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components"


export const AppLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}