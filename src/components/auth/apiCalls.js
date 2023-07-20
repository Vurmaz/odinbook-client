import axios from "axios"
import { useMutation } from "react-query"
import { API, setCookie } from "../../api"

const fetchLogin = async(user) => {
    const response = await axios({
        method:'post',
        data:user,
        withCredentials:true,
        url:`${API}/auth/login`,
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response
}

export const useLogin = (setErrorText) => {
    return useMutation(fetchLogin, {
        onSuccess: async(data) => {
                    
            await setCookie('ah', data.data.token)
            await setCookie('u', data.data.user)
            window.location.href = '/timeline'
        },
        onError: async(data) => {            
            setErrorText(data.response.data.message)
        }
    })
}

const fetchRegister = async(user) => {
    return await axios.post(`${API}/auth/register`, user, {
        withCredentials:true
    })
            
}

export const useRegister = (setErrorText) =>{
    return useMutation(fetchRegister, {
        onSuccess: () => {
            window.location.href = `https://localhost:3000/login`
        },
        onError: async(data) => {  
            await setErrorText(data.response.data.msg.split(',').join(' and '))            
        }
    })
}
