import { memo, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import StarRateIcon from '@mui/icons-material/StarRate';

export const ProductFilter = memo(({categories,onCategoryAdd,handlePricefilter})=>{
    const [endIndex,setEndIndex] = useState(4);
    const [isMoreClicked,setMoreClicked] = useState(false);
    const [value,setValue] = useState([0,100])

    const handleChange = (event, newValue) => {
        handlePricefilter(newValue);
        setValue(newValue);
    };
    return (
        <>
        <h2 className="text-2xl font-medium">Filter</h2>
        <div>
            <h2 className="text-2xl font-medium">Price</h2>
            <div >
                <Box sx={{ width: '11/12' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        aria-label="Small steps"
                        value={value}
                        onChange={handleChange}
                        // valueLabelDisplay="auto"
                        step={5}
                        // getAriaValueText={valuetext}
                        disableSwap
                    />
                </Box>
            </div>
            <div className="flex flex-wrap justify-center text-[18px]">
                <div className="flex flex-wrap w-5/12 justify-center">
                    <input 
                    value={value[0] === 100 ? '1000+' : value[0] === 95 ? 1000 : value[0]*10} 
                    className="w-[60px] border-b-2 border-gray-500 text-center" 
                    onChange={(e)=>{
                        // setValue([Math.round(e.target.value/10),value[1]]) 
                    }}/>
                </div>
                <h3 >to</h3>
                <div className="flex flex-wrap w-5/12 justify-center">
                    <input 
                    value={value[1] === 100 ? '1000+' : value[1] === 95 ? 1000 : value[1]*10 } 
                    className="w-[60px] border-b-2 border-gray-500 text-center" 
                    onChange={(e)=>{
                        // setValue([value[0],Math.round(e.target.value/10)])
                        // console.log([value[0],Math.round(e.target.value/10)])
                    }}/>
                </div>
            </div>
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
                            onClick={()=> onCategoryAdd(e,value)}>
                                {'< '}
                                {e.name}
                            </p>
                        </div>
                    ))
                }
                {
                    isMoreClicked ?
                    <p className="text-gray-500 hover:text-blue-800 hover:underline decoration-2 font-medium cursor-pointer w-auto" onClick={()=>{
                        setMoreClicked(false)
                        setEndIndex(3)
                    }}>Show Less</p>
                    :
                    <p className="text-gray-500 hover:text-blue-800 hover:underline decoration-2 font-medium cursor-pointer w-auto" 
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
                                <div key={e.id} className="flex gap-1 cursor-pointer whitespace-nowrap" onClick={()=> onCategoryAdd(e,value)}>
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
            <h2 className="text-2xl font-medium">Rating</h2>
            <div className="flex gap-4 text-[18px] font-medium cursor-pointer">
                <input type="checkbox" />
                <label>4 <StarRateIcon /></label>
            </div>
            <div className="flex gap-4 text-[18px] font-medium cursor-pointer">
                <input type="checkbox" />
                <label>3 <StarRateIcon /></label>
            </div>
            <div className="flex gap-4 text-[18px] font-medium cursor-pointer">
                <input type="checkbox" />
                <label>2 <StarRateIcon /></label>
            </div>
            <div className="flex gap-4 text-[18px] font-medium cursor-pointer">
                <input type="checkbox" />
                <label>1 <StarRateIcon /></label>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-medium">Sort by</h2>
        </div>
        </>
    )
})