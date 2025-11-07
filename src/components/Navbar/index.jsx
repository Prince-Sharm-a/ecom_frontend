import { memo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";

export const Navbar=memo(()=>{
    const navigate = useNavigate();
    const { cart } = useCart();
    return (
        <header className="flex bg-white text-black px-6 py-4">
            <div>
                <h1 className="text-5xl cursor-pointer " onClick={()=> navigate("/")}>SHOP IT</h1>
            </div>
            <nav className="ml-auto flex gap-8">
                <span onClick={()=> navigate("/wishlist")} ><FavoriteOutlinedIcon sx={{color:"red",fontSize:"48px",cursor:"pointer"}} /> </span>
                <span onClick={()=> navigate("/cart")} className="relative w-[50px]">
                    <ShoppingCartOutlinedIcon  sx={{fontSize:"48px",cursor:"pointer"}}/>
                    {
                        cart.length > 0 && <span className="flex items-center justify-center absolute right-[-3px] top-[-3px] bg-red-600 w-[25px] h-[25px] rounded-full text-white">{cart.length}</span>
                    }
                </span>
                <span onClick={()=> {}} ><AccountCircleOutlinedIcon sx={{fontSize:"48px",cursor:"pointer"}} /> </span>
            </nav>
        </header>
    )
})