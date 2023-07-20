import axios from "axios"
import { useMutation } from "react-query"
import { getCookie, API } from "../../api"

    export const getUserInfo = async(params) => {
        return await axios.get(
            `${API}/dashboard/user/user/${params.id}`,
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            }
        )            
    }  
  
    export const getUserPosts = async(params) => {
        return await axios.get(
            `${API}/dashboard/user/${params.id}`,
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            }                
        )
    }

    export const getAllFriends = async(params) => {
        return await axios.get(
            `${API}/friends/${params.id}`, 
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true                    
            }
        )
    }

    const fetchUpdateProfilePhoto = async(url) => {
        return await axios.post(
            `${API}/dashboard/user/${getCookie(' u')}`,
            {
                url:url
            },
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            }             
        )
    }

    export const useUpdateProfilePhoto = () => {
        return useMutation(fetchUpdateProfilePhoto)
    }