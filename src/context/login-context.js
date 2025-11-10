import { createContext, memo, useContext, useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

const LoginContext = createContext();

const LoginProvider = memo(({children}) =>{
    const initialState = {
        user_id:"",
        name:"",
        email:"",
        avatar:"",
        role:"",
        password:"",
        token:{ access_token: localStorage.getItem("token") || '' , refresh_token: ''},
    }
    
    const [{email,password,token,name,avatar,role,user_id},loginDispatch] = useReducer(loginReducer,initialState);

    return (
        <LoginContext.Provider value={{email, password, token, name, avatar, role, user_id, loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
})

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };