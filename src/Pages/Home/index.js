import { memo, useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { getAllProductCategories, getAllProducts } from "../../api/getAllProducts";
import { ProductCard } from "../../components/ProductCard";
import { ProductFilter } from "../../components/ProductFilter";

export const Home = memo(()=>{
    const intialState ={
        categoryFilter:'',
        priceFilter:{min:0,max:10000},
        ratingFilter:0,
    }
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
    
    const onCategoryAdd = (category)=>{
        if (category?.isActive){
            const modifiedCategory = categories.map( ctg => ctg.id===category.id ? {...ctg,isActive:false} : ctg)
            setfilteredProducts(products);
            setCategories(modifiedCategory);
        } else{
            const filterProduct = products.filter( prd => prd.category.id===category.id);
            const modifiedCategory = categories.map( ctg => ctg.id===category.id ? {...ctg,isActive:true} : {...ctg,isActive:false});
            setfilteredProducts(filterProduct);
            setCategories(modifiedCategory);
        }
    }

    return (
        <>
        <Navbar />
        <main className="flex gap-5">
            <div className="w-2/12 relative">
            <div className="w-full relative p-4 bg-white my-4 ml-4">
                <ProductFilter categories={categories} onCategoryAdd={onCategoryAdd} />
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