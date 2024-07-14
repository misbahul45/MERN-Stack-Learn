import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Root=createRootRoute({
    component:()=>(
        <>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
            </ul>
            <Outlet />
        </>
    )
})