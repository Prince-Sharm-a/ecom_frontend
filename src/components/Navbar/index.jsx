import { memo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export const Navbar=memo(()=>{
    return (
        <header className="flex bg-green-900 p-4 text-slate-50">
            <div>
                <h1 className="ml-auto flex gap-2">SHOP IT</h1>
            </div>
            <nav className="ml-auto flex gap-2">
                <span ><FavoriteOutlinedIcon sx={{color:"red"}} /> </span>
                <span><ShoppingCartOutlinedIcon /> </span>
                <span><AccountCircleOutlinedIcon /> </span>
            </nav>
        </header>
    )
})