import { memo, useMemo } from "react";
import { useCart } from "../../context/cart-context";

export const PriceDetails = memo(()=>{
    const { cart } = useCart();
    const sumPrice = useMemo(()=>{
        return cart.reduce((sum,product)=> sum+product.price, 0)
    },[cart])
    const sumDiscountPrice = useMemo(()=>{
        return Math.round(cart.reduce((sum,product)=> sum+product.price, 0)*0.3)
    },[cart])
    const deliveryCharge = cart.length > 0 ? sumPrice<500 ?  50 : 0 : 0 ;
    return (
        <div className="flex flex-col bg-white w-[500px]  p-4 rounded shadow gap-5">
            <p className="text-4xl font-medium border-b pb-5">Price Details</p>
            <div className="flex flex-col gap-5 text-2xl">
                <div className="flex">
                    <p>Price ({cart.length} items)</p>
                    <p className="ml-auto">Rs. {sumPrice}</p>
                </div>
                <div className="flex">
                    <p>Discount</p>
                    <p className="ml-auto">Rs. {sumDiscountPrice}</p>
                </div>
                <div className="flex">
                    <p>Delivery Charge</p>
                    <p className="ml-auto">Rs. {deliveryCharge}</p>
                </div>
            </div>
            <div className="flex text-2xl border-t pt-2">
                <p>Total Amount</p>
                <p className="ml-auto">Rs. {sumPrice-sumDiscountPrice+deliveryCharge}</p>
            </div>
            <div className="">
                <button className="button ">PLACE ORDER</button>
            </div>
        </div>
    )
})