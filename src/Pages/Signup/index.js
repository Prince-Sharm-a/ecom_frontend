import { memo } from "react";
import { Navbar } from "../../components/Navbar";
import { CreateAccount } from "../../components/CreateAccount";

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