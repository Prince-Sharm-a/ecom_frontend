import { memo } from "react";
import { useCart, useWishlist } from "../../context"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useNavigate } from "react-router-dom";

export const ProductCard = memo(({data})=>{
    const { cartDispatch, cart } = useCart();
    const { wishlistDispatch, wishlist } = useWishlist();
    const isProductInCart = cart?.length > 0 && cart.some(product => product?.id===data.id);
    const isProductInWishlist = wishlist?.length > 0 && wishlist.some(product => product.id === data?.id);
    const navigate = useNavigate();

    const onAddToCartClick = (product) =>{
        cartDispatch({
            type: 'ADD_TO_CART',
            payload:{ product },
        })
    }

    const onWishlistClick = (product) =>{
        isProductInWishlist ?
        wishlistDispatch({
            type: 'REMOVE_FROM_WISHLIST',
            payload: product.id,
        })
        :
        wishlistDispatch({
            type: 'ADD_TO_WISHLIST',
            payload:{ product },
        })
    }

    return (
        <div className="card card-vertical flex relative shadow">
            <div className="card-image-container ">
                <img className="card-image" src={data?.images[0]} alt="shoes" />
            </div>
            <div className="card-details">
                <div className="card-title ">{data?.title}</div>
                <div className="card-description">
                    {/* <p className="card-des">{data?.description}</p> */}
                    <p className="card-price font-mono">
                        Rs. {Math.round(data?.price - data?.price*0.3)} 
                        {/* <span className="price-strike-through"> Rs. {Math.round(data?.price)} </span> */}
                        <span className="discount text-red-600 font-mono"> (30% OFF)</span>
                    </p>
                </div>
                <div className="cta-btn ">
                    {/* <button className="button btn-primary btn-icon cart-btn d-flex">
                        <FavoriteOutlinedIcon className="mr-2" /> Add To Wishlist
                    </button> */}
                    {
                        isProductInCart ?
                            <button 
                            className="button btn-primary btn-icon cart-btn"
                            onClick={()=> navigate("/cart")}
                            >
                                <ShoppingCartCheckoutIcon className="mr-2" sx={{fontSize:"32px"}} /> GO TO CART
                            </button>
                            :
                            <button 
                            className="button btn-primary btn-icon cart-btn"
                            onClick={()=>onAddToCartClick(data)}
                            >
                                <AddShoppingCartIcon className="mr-2" sx={{fontSize:"32px"}} /> ADD TO CART
                            </button>

                    }
                </div>
                {
                    isProductInWishlist ?
                    <button 
                    className="flex flex-wrap absolute right-[5px] text-gray-500 bg-white rounded-full place-content-center top-[5px] h-[32px] w-[32px]"
                    onClick={()=> onWishlistClick(data)}
                    >
                        <FavoriteOutlinedIcon sx={{color:"red"}}/>
                    </button>
                    :
                    <button 
                    className="flex flex-wrap absolute right-[5px] text-gray-500 bg-white rounded-full place-content-center top-[5px] h-[32px] w-[32px]"
                    onClick={()=> onWishlistClick(data)}
                    >
                        <FavoriteOutlinedIcon />
                    </button>
                }
            </div>
        </div>
    )
})