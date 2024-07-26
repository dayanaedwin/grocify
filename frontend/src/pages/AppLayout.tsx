import { Outlet } from "react-router-dom"


export const AppLayout = () => {
    return (
        <div>Hello
            <Outlet />
        </div>
    )
}