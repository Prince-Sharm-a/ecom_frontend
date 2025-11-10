import { memo } from "react";
import { Login } from "../../components/Login";
import { Navbar } from "../../components/Navbar";

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