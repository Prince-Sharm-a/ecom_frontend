import { memo } from "react";
import { Navbar } from "../../components/Navbar";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { useCart } from "../../context/cart-context";
import { PriceDetails } from "../../components/PriceDetails";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from "react-router-dom";

export const Cart = memo(()=>{
    const { cart }  = useCart();
    const navigate = useNavigate();

    const handleAddItemClick = ()=>{
        navigate("/");
    }

    return (
        <>
        <Navbar />
        <main className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
            <div className="cart-page-heading">
                <h1 className="text-3xl">My Cart</h1>
            </div>
            <div className="flex gap-5 w-full flex-wrap justify-center">
                <div className="w-6/12">
                <div className=" w-full bg-white rounded relative shadow place-content-center ">
                    {
                        cart.length > 0 ? cart.map(product => (
                            <HorizontalProductCard data={product} key={product.id} />
                        )) :
                        <button className="button font-medium text-3xl w-auto px-20 my-[60px] ml-[40%] flex flex-wrap flex-col justify-center" onClick={handleAddItemClick} ><ShoppingCartOutlinedIcon sx={{fontSize:"32px"}} />Add Items....</button>
                    }
                </div>
                </div>
                <div>
                    <PriceDetails />
                </div>
            </div>
        </main>
        </>
    )
})