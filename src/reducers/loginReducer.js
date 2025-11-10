export const loginReducer = (state,{type,payload})=>{
    const avatarURL = 'https://picsum.photos/'
    switch(type){
        case "EMAIL":
            return {...state,email:payload};
        case "PASSWORD":
            return {...state,password:payload};
        case "TOKEN":
            return {...state,token:payload};
        case "LOGOUT":
            return {
                ...state,
                user_id:'',
                name:'',
                email:'',
                avatar:'',
                role:'',
                password:'',
                token:{}, 
            };
        case "NAME":
            return {...state,name:payload};
        case "MOBILE_NO":
            return {...state,avatar:payload};
        case "LOGIN":
            return {
                ...state,
                user_id: payload.id,
                name: payload.name,
                email: payload.email,
                avatar: payload.avatar.slice(avatarURL.length),
                role: payload.role,
                password: payload.password,
            }
        default:
            return state;
    }
}