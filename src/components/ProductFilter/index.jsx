import { memo, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ProductFilter = memo(({categories,onCategoryAdd})=>{
    const [endIndex,setEndIndex] = useState(4);
    const [isMoreClicked,setMoreClicked] = useState(false);

    
    return (
        <>
        <h2 className="text-2xl font-medium">Filter</h2>
        <div>
            <h2 className="text-2xl font-medium">Price</h2>
        </div>
        <div className="relative">
            <h2 className="text-2xl font-medium relative ">Category </h2>
            {
                endIndex <= 10 ?
                <div className="filter-category">
                {
                    categories.length > 0 && categories.slice(0,endIndex).map(e => (
                        <div key={e.id} className="flex gap-2">
                            <p 
                            className={`text-[18px] ${e?.isActive ? 'text-black' : 'text-gray-500'} cursor-pointer font-medium`}
                            onClick={()=> onCategoryAdd(e)}>
                                {'< '}
                                {e.name}
                            </p>
                        </div>
                    ))
                }
                {
                    isMoreClicked ?
                    <p className="text-blue-800 underline decoration-2 font-medium cursor-pointer w-auto" onClick={()=>{
                        setMoreClicked(false)
                        setEndIndex(3)
                    }}>Show Less</p>
                    :
                    <p className="text-blue-800 underline decoration-2 font-medium cursor-pointer w-auto" 
                    onClick={()=>{
                        setMoreClicked(true)
                        setEndIndex(categories.length)
                    }}>{categories.length} more</p>
                }
                </div> :
                <div className="absolute z-50 top-[35px] min-w-[300px] max-w-[600px] bg-white shadow left-0 p-2">
                    <div className="flex">
                        <input placeholder="Search Category...." className="p-2 shadow m-2 w-6/12 h-[40px]"/>
                        <button 
                        className="ml-auto" 
                        onClick={()=>{
                            setMoreClicked(false)
                            setEndIndex(4);
                        }}><CloseIcon /> </button>
                    </div>
                    <div className="h-[150px] grid grid-flow-col grid-rows-4 gap-2 overflow-y-auto scrollbar-hide">
                        {
                            categories.length > 0 && categories.slice(0,endIndex).map(e => (
                                <div key={e.id} className="flex gap-1 cursor-pointer whitespace-nowrap" onClick={()=> onCategoryAdd(e)}>
                                    <p 
                                    className={`text-[18px] ${e?.isActive ? 'text-black' : 'text-gray-500'} w-[13px] font-medium`}>
                                        {'<'}
                                    </p>
                                    <p 
                                    className={`text-[18px] ${e?.isActive ? 'text-black' : 'text-gray-500'} font-medium`}>
                                        {e.name}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
        <div>
            <h2 className="text-2xl font-medium">Sort by</h2>
        </div>
        <div>
            <h2 className="text-2xl font-medium">Rating</h2>
        </div>
        </>
    )
})