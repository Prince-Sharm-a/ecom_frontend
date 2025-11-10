import { memo } from "react";
import { Login, Navbar } from "../../components";

export const AuthLogin = memo(()=>{
    return(
        <div className="h-screen flex flex-col">
            <Navbar />
            <main className="flex my-auto">
                <Login />
            </main>
        </div>
    )
})