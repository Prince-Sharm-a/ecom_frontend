import axios from "axios";



export const userLogin = async (email,password)=> {
    const url = 'https://api.escuelajs.co/api/v1/auth/login'
    try{
        const { data } = await axios.post(url,{
            email: email,
            password: password
        })
        return data;
    } catch(err){
        return err.message
    }
}
export const fetchProfile = async (access_token)=>{
    const url = 'https://api.escuelajs.co/api/v1/auth/profile'
    try{
        const { data } = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        })
        return data;
        
    }catch(err){
        return err.message
    }
}

export const createNewAccount = async (details)=>{
    const url = "https://api.escuelajs.co/api/v1/users"
    try{
        const { data } = await axios.post(url,details)
        console.log(data);
        return data;
    } catch(err){
        return err.message
    }
}