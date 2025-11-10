import { memo } from "react";
import { Navbar, CreateAccount } from "../../components";

export const Signup = memo(()=>{
    return(
        <div className="h-screen flex flex-col">
            <Navbar />
            <main className="flex my-auto">
                <CreateAccount />
            </main>
        </div>
    )
})