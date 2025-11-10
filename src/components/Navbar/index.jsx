import { memo, useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useNavigate } from "react-router-dom";
import { useCart, useLogin } from "../../context";
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchProfile } from "../../api/auth";
import logo from "../../logosvg.png"

export const Navbar=memo(()=>{
    const navigate = useNavigate();
    const { cart } = useCart();
    const initialDropDown = {
        isAccountDropDownOpen:false,
        isWishlistDropDownOpen:false,
        isCartDropDownOpen:false,
    }
    const [ dropdown,setDropDown] = useState(initialDropDown);
    const { token, loginDispatch, name, email } = useLogin();
    // const [pos, setPos] = useState({x:0,y:0});
    useEffect(()=>{
        ( async ()=>{
            if(token.access_token){
                const details = await fetchProfile(token.access_token);
                if(details?.email){
                    loginDispatch({type:"LOGIN",payload:details});
                }
            }
        })()
    },[token.access_token,loginDispatch])

    const onLogoutClick = ()=>{
        loginDispatch({
            type:'LOGOUT'
        })
        localStorage.clear()
    }
    const onLoginClick = () =>{
        if(!token?.access_token){
            navigate('/auth/login');
        }
    }

    return (
        <header className="flex bg-white text-black px-6 py-4">
            <div>
                {/* <h1 className="text-5xl cursor-pointer " onClick={()=> navigate("/")}>SHOPY IT</h1> */}
                <img className="w-[200px] h-[60px]" src={logo} alt="logo" onClick={()=> navigate("/")}/>
            </div>
            <nav className="ml-auto flex gap-8">
                <span 
                onClick={()=> navigate("/wishlist")} 
                className="relative"
                // onMouseMove={(e)=>setPos({x:e.clientX,y:e.clientY})}
                onMouseLeave={()=>setDropDown({...dropdown,isWishlistDropDownOpen:false})} 
                onMouseEnter={()=>setDropDown({...dropdown,isWishlistDropDownOpen:true})} >
                    <FavoriteOutlinedIcon sx={{color:"red",fontSize:"48px",cursor:"pointer"}} /> 
                    {
                        dropdown.isWishlistDropDownOpen && 
                        <div className="absolute font-light bottom-[-16px] bg-none text-red-500 text-[18px] font-medium ">
                            <button className="hover:underline">Wishlist</button>
                        </div>
                    }
                </span>
                <span 
                onClick={()=> navigate("/cart")} 
                className="relative"
                onMouseLeave={()=>setDropDown({...dropdown,isCartDropDownOpen:false})} 
                onMouseEnter={()=>setDropDown({...dropdown,isCartDropDownOpen:true})}>
                    <ShoppingCartOutlinedIcon  sx={{fontSize:"48px",cursor:"pointer"}}/>
                    {
                        cart.length > 0 && <span className="flex items-center justify-center absolute right-[-3px] top-[-3px] bg-red-600 w-[25px] h-[25px] rounded-full text-white">{cart.length}</span>
                    }
                    {
                        dropdown.isCartDropDownOpen && 
                        <div className="absolute bottom-[-18px] bg-none text-[18px] font-medium ">
                            <button className="hover:underline">Cart</button>
                        </div>
                    }
                </span>
                <span className="relative" onClick={onLoginClick} onMouseLeave={()=>setDropDown({...dropdown,isAccountDropDownOpen:false})} onMouseEnter={()=>setDropDown({...dropdown,isAccountDropDownOpen:true})}  >
                    <AccountCircleOutlinedIcon sx={{fontSize:"48px",cursor:"pointer"}} />
                    {
                        dropdown.isAccountDropDownOpen ? 
                        token?.access_token?.length > 0 ?
                        <div className="absolute bottom-[-92px] right-[-20px] z-50 gap-2 border-b-2 flex flex-col bg-white text-[16px] font-light place-content-center shadow p-2">
                            <div className="flex flex-wrap justify-center whitespace-nowrap">
                                <p>Hi! {name}</p>
                                <p >Email: {email}</p>
                            </div>
                            <button onClick={onLogoutClick} className="text-red-500 font-normal text-[12px]"><LogoutIcon sx={{fontSize:'12px'}} /> LOGOUT</button>
                        </div> :
                        <div className="absolute left-[15px] bottom-[-22px] bg-none text-[20px] font-medium ">
                            <button className="hover:text-blue-500 hover:underline">Login</button>
                        </div> :
                        <></>
                    }
                </span>
            </nav>
        </header>
    )
})