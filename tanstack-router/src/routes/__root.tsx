import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { AuthContext } from "../assets/hooks/useAuth";

type RouteContext={
    auth:AuthContext
}

/* 
 folder dengan nama _folder
 itu nama foldernya tidak kebaca
*/

export const Route=createRootRouteWithContext<RouteContext>()({
    component:()=>{
        return(
            <main>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/search' search={{ 
                            title: 'hello',
                            author: 'world'
                        }} >Search</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/setting">Setting</Link>
                    </li>
                </ul>
                <Outlet />
            </main>
        )
    }
})