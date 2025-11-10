import { memo, useRef, useState } from "react";
import { createNewAccount } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const CreateAccount = memo(()=>{

    const initialState ={
        name:'',
        email:'',
        mobile_no:'',
        password:'',
        confirmPassword:''
    }
    const [ details, setDetails] = useState(initialState);
    const navigate = useNavigate();
    const initialShowPassword = {
        showPassword:false,
        showConfirmPassword:false,
    }
    const [ showPass, setShowPass] = useState(initialShowPassword);
    const confirmPasswordRef = useRef();

    const onFormSubmit = async (e) =>{
        e.preventDefault();
        if(details.password!==details.confirmPassword){
            console.log("confirm password",details.confirmPassword,"password",details.password)
            confirmPasswordRef.current.focus();
        } else {
            const data = await createNewAccount({
                name: details.name,
                email: details.email,
                avatar: `https://picsum.photos/${details.mobile_no}`,
                password:details.password,
            });
            setDetails(initialState);
            if (data?.name && data.email && data.password && data.avatar){
                navigate('/auth/login')
            }
        }
    }
    const onEmailChange =(e)=>{
        setDetails({...details,email:e.target.value});
    }
    const onPasswordChange = (e)=>{
        setDetails({...details,password:e.target.value});
    }
    const onConfirmPasswordChange = (e)=>{
        setDetails({...details,confirmPassword:e.target.value});
    }
    const onNameChange = (e)=>{
        setDetails({...details,name:e.target.value});
    }
    const onMobileNoChange = (e)=>{
        setDetails({...details,mobile_no:e.target.value});
    }
    return(
        <>
        <form onSubmit={onFormSubmit} className="bg-white shadow-md w-3/12 flex flex-wrap gap-5 mx-auto my-4 p-10">
            <div className="flex w-full flex-wrap">
                <h1 className="m-auto text-4xl font-light">Sign Up</h1>
            </div>
            <div className="">
                <span className="text-3xl font-light">Name <span className="text-red-600 text-4xl">*</span></span>
                <input value={details.name} className="mt-2 w-10/12 text-2xl border-b-2 outline-none" type="text" onChange={onNameChange} required placeholder="Enter Your Name..." ></input>
            </div>
            <div className="">
                <span className="text-3xl font-light">Email <span className="text-red-600 text-4xl">*</span></span>
                <input value={details.email} className="mt-2 w-10/12 text-2xl border-b-2 outline-none" type="email" onChange={onEmailChange} required placeholder="example@gmail.com" ></input>
            </div>
            <div className="">
                <span className="text-3xl font-light">Mobile No. <span className="text-red-600 text-4xl">*</span></span>
                <div className="">
                    <input value="+91" className="mt-2 w-[40px] text-xl border-b-2 outline-none mr-[5px]" type="mobilno" onChange={onEmailChange} ></input>
                    <input value={details.mobile_no} className="mt-2 ml-[5px] w-8/12 text-xl border-b-2 outline-none" type="mobilno" onChange={onMobileNoChange} required placeholder="10 digit mobile no." ></input>
                </div>
            </div>
            <div className="w-full">
                <span className="text-3xl font-light">Password <span className="text-red-600 ">*</span></span>
                <div className="w-full relative">
                    <input 
                    value={details.password}
                    className="w-10/12 mt-2 border-b-2 text-2xl outline-none"  
                    type={showPass.showPassword ? "text" : "password"} 
                    onChange={onPasswordChange} 
                    required 
                    placeholder="password..." />
                    <div className="absolute right-[25px] top-0 cursor-pointer" onClick={()=>setShowPass({...showPass,showPassword:!showPass.showPassword})}>
                    {
                        showPass.showPassword ? 
                            <VisibilityOffIcon sx={{color:"gray"}} /> : <VisibilityIcon sx={{color:"gray"}} />
                    }
                    </div>
                </div>
            </div>
            <div className="w-full">
                <span className="text-3xl font-light">Confirm Password <span className="text-red-600 ">*</span></span>
                <div className="w-full relative">
                    <input 
                    value={details.confirmPassword}
                    ref={confirmPasswordRef}
                    className={`w-10/12 mt-2 border-b-2 text-2xl outline-none 
                        ${details.confirmPassword && details.confirmPassword!== details.password ? 'border-red-500' :'' } 
                    `}  
                    type={showPass.showConfirmPassword ? "text" : "password"} 
                    onChange={onConfirmPasswordChange} 
                    required 
                    placeholder="confirm password..." />
                    <div className="absolute right-[25px] top-0 cursor-pointer" onClick={()=>setShowPass({...showPass,showConfirmPassword:!showPass.showConfirmPassword})}>
                    {
                        showPass.showConfirmPassword ? 
                            <VisibilityOffIcon sx={{color:"gray"}} /> : <VisibilityIcon sx={{color:"gray"}} />
                    }
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full text-3xl">
                <button className="btn-primary w-10/12 flex flex-wrap border-2 rounded-md shadow-md place-content-center cursor-pointer">Sign up</button>
            </div>
            <div className="flex justify-center w-full text-xl ">
                <h1 className="hover:text-blue-700 hover:underline cursor-pointer" onClick={()=>navigate("/auth/login")}>Already Have Account {">"}</h1>
            </div>
        </form>
        </>
    )
})