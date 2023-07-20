import axios from "axios"
import { useMutation } from "react-query"
import { API, getCookie } from "../../../api"

    export const getReccomends = async() => {
        const response = await axios.get(`${API}/friends/people/${getCookie(' u')}`, {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },               
            withCredentials:true            
        })
        return response.data
    }

    export const getRequests = async() => {
        const response =  await axios.get(`${API}/friends/request/${getCookie(' u')}`, {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },
            withCredentials:true            
        })
        return response.data
    }    

    const fetchSendRequest = async(id) => {        
        return await axios.post(
            `${API}/friends/request/${id}`,
            {
                sendersId:getCookie(' u')
            },
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },               
                withCredentials:true                 
            }
        )
    }

    export const useSendRequest = () => {
        return useMutation(fetchSendRequest)
    }

    const fetchAcceptRequest  = async(id) => {
        return await axios.post(
            `${API}/friends/request/accept/${getCookie(' u')}`,
            { otherId:id },
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },               
                withCredentials:true                     
            }
        )
    }

    export const useAcceptRequest = () => {
        return useMutation(fetchAcceptRequest)
    }

    const fetchRejectFriendsRequest = async(id) => {
        return await axios.post(
            `${API}/friends/request/reject/${getCookie(' u')}`,
            { otherId:id },
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },               
                withCredentials:true                     
            }
        )
    }

    export const useRejectFriendRequest = () => {
        return useMutation(fetchRejectFriendsRequest)
    }


