import { memo, useState } from "react";
import { useLogin } from "../../context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Login = memo(()=>{
    
    const { loginDispatch, email, password } = useLogin();
    const navigate = useNavigate();
    const [ showPassword, setShowPassword] = useState(false);

    const onFormSubmit = async (e) =>{
        e.preventDefault();
        const data = await userLogin(email,password);
        if(Object.keys(data)?.length > 0){
            localStorage.setItem('token',data.access_token)
        }
        loginDispatch({type:"TOKEN",payload:data});
        if (data?.access_token){
            navigate('/')
        }
    }
    const onEmailChange =(e)=>{
        loginDispatch({type:"EMAIL",payload:e.target.value});
    }
    const onPasswordChange = (e)=>{
        loginDispatch({type:"PASSWORD",payload:e.target.value});
    }
    return(
        <>
        <form onSubmit={onFormSubmit} className="bg-white shadow-md w-3/12 flex flex-wrap gap-5 mx-auto p-10">
            <div className="flex w-full flex-wrap">
                <h1 className="m-auto text-4xl font-light">Login</h1>
            </div>
            <div className="">
                <span className="text-3xl font-light">Email <span className="text-red-600 text-4xl">*</span></span>
                <input className="mt-2 w-10/12 text-2xl border-b-2 outline-none" type="email" onChange={onEmailChange} required placeholder="example@gmail.com" ></input>
            </div>
            <div className="w-full">
                <span className="text-3xl font-light">Password <span className="text-red-600 ">*</span></span>
                <div className="w-full relative">
                    <input className="w-10/12 mt-2 border-b-2 text-2xl outline-none"  type={showPassword ? "text" : "password"} onChange={onPasswordChange} required placeholder="password..." />
                    <div className="absolute right-[25px] top-0 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                    {
                        showPassword ? 
                            <VisibilityOffIcon sx={{color:"gray"}} /> : <VisibilityIcon sx={{color:"gray"}} />
                    }
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full text-3xl">
                <button className="btn-primary w-10/12 flex flex-wrap border-2 rounded-md shadow-md place-content-center cursor-pointer">Login</button>
            </div>
            <div className="flex justify-center w-full text-xl ">
                <h1 className="hover:text-blue-700 hover:underline cursor-pointer" onClick={()=>navigate("/signup")}>Create New Account {">"}</h1>
            </div>
        </form>
        </>
    )
})