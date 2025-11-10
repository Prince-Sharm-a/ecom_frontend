import { memo } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCart, useWishlist } from "../../context";

export const HorizontalProductCard = memo(({data})=> {
    const { cartDispatch } = useCart();
    const { wishlistDispatch, wishlist } = useWishlist();
    const isProductInWishlist = wishlist?.length > 0 && wishlist.some(product => product.id === data?.id);

    const handleRemoveFromCartClick = (product)=>{
        cartDispatch({
            type:"REMOVE_FROM_CART",
            payload: product.id,
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
        <>
        <div className="card-horizontal flex shadow">
            <div className="card-hori-image-container relative ">
                <img className="card-image" src={data.images[0]} alt="shoes" />
                {/* <small className="c-badge absolute left-0">Trending</small> */}
            </div>
            <div className="card-horizontal-details ">
                <div className="card-horizontal-title">{data.title}</div>
                <div className="card-hori-description">
                    {/* <p className="card-des">Man Sneakers</p> */}
                    <p className="card-hori-price">Rs. {Math.round(data.price - data.price*0.3)}
                        {/* <span className="price-strike-through">Rs. 2199</span> */}
                        <span className="discount text-red-500"> (30% OFF)</span>
                    </p>
                </div>
                <div className="quantity-container flex gap-4 font-medium">
                    <p className="q-title">Quantity: </p>
                    <div className="q-count-container flex align-center gap-4">
                        <button 
                        className="q-count-d "
                        >
                            <RemoveIcon />
                        </button>
                        <span className="q-count-value">1</span>
                        <button className="q-count-i align-center">
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className="cta-horizontal-btn flex gap-4">
                    <button className="button hori-btn" onClick={()=> handleRemoveFromCartClick(data)}>
                        Remove From Cart
                    </button>
                    {
                        isProductInWishlist ?
                            <button className="button hori-btn bg-transparent" onClick={()=> onWishlistClick(data)}>
                                Remove From Wishlist
                            </button>
                            :
                            <button className="button hori-btn bg-transparent" onClick={()=> onWishlistClick(data)}>
                                Add To Wishlist
                            </button>
                    }
                </div>
            </div>
        </div>
        </>
    )
})