import axios from "axios";


const BaseUrl = "https://api.escuelajs.co/api/v1"
export const getAllProducts = async () =>{
    const url =`${BaseUrl}/products`;
    try{
        const { data } = await axios.get(url);
        console.log(data);
        return data;
    } catch(err){
        return err.message;
    }
}

export const getAllProductCategories = async () =>{
    const url =`${BaseUrl}/categories`;
    try{
        const { data } = await axios.get(url);
        console.log(data);
        return data;
    } catch(err){
        return err.message;
    }
}