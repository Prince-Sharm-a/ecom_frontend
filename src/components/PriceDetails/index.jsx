import { memo, useMemo } from "react";
import { useCart } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";

export const PriceDetails = memo(()=>{
    const { cart, cartDispatch } = useCart();
    const { token, email, name, avatar  } = useLogin();
    const navigate = useNavigate();
    
    const loadScript=async (src)=>{
        return new Promise((resolve,reject)=>{
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script)
        })
    }

    const displayRazorpay = async (e)=>{
        if(token?.access_token){
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            const options = {
                key: "rzp_test_RdaSklFHUu7oDH", // Enter the Key ID generated from the Dashboard
                amount: (sumPrice-sumDiscountPrice+deliveryCharge)*100, // Amount is in currency subunits. 
                currency: "INR",
                name: "SHOP IT", //your business name
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
                theme: {
                    color: "#3399cc"
                },
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": name, //your customer's name
                    "email": email,
                    "contact": avatar //Provide the customer's phone number for better conversion rates 
                },
                handler: ({payment_id}) => {
                    navigate("/")
                    cartDispatch({
                        type:"MAKE_CART_EMPTY",
                    })
                    
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            // e.preventDefault();
        } else {
            navigate("/auth/login");
        }
    }

    const sumPrice = useMemo(()=>{
        return cart.reduce((sum,product)=> sum+product.price, 0)
    },[cart])

    const sumDiscountPrice = useMemo(()=>{
        return Math.round(cart.reduce((sum,product)=> sum+product.price, 0)*0.3)
    },[cart])

    const deliveryCharge = useMemo(()=>{
        return cart.length > 0 ? sumPrice<500 ?  50 : 0 : 0 ;
    },[cart,sumPrice])

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
                <button className="button " onClick={displayRazorpay} disabled={cart.length===0}>PLACE ORDER</button>
            </div>
        </div>
    )
})