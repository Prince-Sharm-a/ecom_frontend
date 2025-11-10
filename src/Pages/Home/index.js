import { memo, useEffect, useState } from "react";
import { Navbar, ProductCard, ProductFilter } from "../../components";
import { getAllProductCategories, getAllProducts } from "../../api/getAllProducts";

export const Home = memo(()=>{
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const [filteredProducts,setfilteredProducts]=useState(products);

    useEffect(()=>{
        (async ()=>{
            const data = await getAllProducts();
            setProducts(data);
            setfilteredProducts(data);
            const categ = await getAllProductCategories();
            setCategories(categ);
        })()
    },[])
    
    const onCategoryAdd = (category,[min,max])=>{
        if (category?.isActive){
            const modifiedCategory = categories.map( ctg => ctg.id===category.id ? {...ctg,isActive:false} : ctg);
            const filterProduct = products.filter( prd => (max===100 ? prd.price >= (min*10) : prd.price >= (min*10) && prd.price <= (max*10)));
            // console.log(filterProduct,max*10,min*10)
            setfilteredProducts(filterProduct);
            setCategories(modifiedCategory);
        } else{
            // console.log(max*10,min*10)
            const filterProduct = products.filter( prd => prd.category.id===category.id && (max===100 ? prd.price >= (min*10) : prd.price >= (min*10) && prd.price <= (max*10)));
            // console.log(filterProduct,)
            const modifiedCategory = categories.map( ctg => ctg.id===category.id ? {...ctg,isActive:true} : {...ctg,isActive:false});
            setfilteredProducts(filterProduct);
            setCategories(modifiedCategory);
        }
    }
    const handlePricefilter=([min,max])=>{
        const category = categories.find( ctg => ctg?.isActive );
        // console.log(category?.length > 0)
        const categoryFilter= category?.length > 0 ?  products.filter( prd => prd.category.id===category.id) : products;
        // console.log(categoryFilter)
        if(max===100){
            const filterProduct = categoryFilter.filter( prd => prd.price >= min*10);
            setfilteredProducts(filterProduct);
        }
        else{
            const filterProduct = categoryFilter.filter( prd => prd.price >= min*10 && prd.price <= max*10);
            // console.log(filterProduct)
            setfilteredProducts(filterProduct);
        }
    }

    return (
        <>
        <Navbar />
        <main className="flex gap-5 ">
            <div className="w-2/12">
            <div className="w-full relative p-4 bg-white my-4 ml-4">
                <ProductFilter categories={categories} onCategoryAdd={onCategoryAdd} handlePricefilter={handlePricefilter}/>
            </div>
            </div>
            <div className="w-10/12">
            <div
            className="flex flex-wrap ml-auto justify-center w-full mr-4 my-4 p-4 bg-white gap-5 px-[5%]"
            >
                {
                    filteredProducts?.length > 0 && filteredProducts?.map(prd => (<div key={prd.id}><ProductCard data={prd} /></div>))
                }
            </div>
            </div>
        </main>
        </>
    )
})