import { memo } from "react";
import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useWishlist } from "../../context/wishlist-context";

export const Wishlist = memo(()=>{
    const { wishlist } = useWishlist();
    return (
        <>
        <Navbar />
        <main className="flex flex-wrap justify-center my-4">
            <div className="bg-white w-10/12 px-[5%] flex flex-wrap gap-5">
                {
                    wishlist?.length > 0 && wishlist.map(product => <ProductCard key={product?.id} data={product} />)
                }
            </div>
        </main>
        </>
    )
})