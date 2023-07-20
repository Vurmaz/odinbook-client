import axios from "axios"
import { useMutation } from "react-query"
import { API, getCookie } from "../../api"

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

export const getRequests = async(params) => {    
    return await axios.get(
        `${API}/friends/request/${params.id}`,
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }                
    )
}

export const getReccomends = async(params) => {
    return await axios.get(
        `${API}/friends/people/${params.id}`,
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }                
    )
}

const fetchDeleteFriend = async( data ) => {
    
    return await axios.post(
        `${API}/friends/delete/${getCookie(' u')}`,
        {
            "otherId":data._id
        },
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }
    )
}

export const useDeleteFriend = () => {
    return useMutation(fetchDeleteFriend)
}

const fetchSendRequest = async(data) => {
    return await axios.post(
        `${API}/friends/request/${data._id}`,
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

export const getSendedRequests = async() => {
    return await axios.get(
        `${API}/friends/request/sended/${getCookie(' u')}`,
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }                
    )
}

const undoRequest = async(data) => {
    return await axios.post(
        `${API}/friends/request/undo/${getCookie(' u')}`,
        {
            "otherId":data._id
        },
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }
    )
}

export const useUndoRequest = () => {
    return useMutation(undoRequest)
}

const acceptRequest = async(data) => {        
    return await axios.post(
        `${API}/friends/request/accept/${getCookie(' u')}`,
        {
            "otherId":data._id
        },
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }
    )
}

export const useAcceptRequest = () => {
    return useMutation(acceptRequest)
}

const rejectRequest = async(data) => {        
    return await axios.post(
        `${API}/friends/request/reject/${getCookie(' u')}`,
        {
            "otherId":data._id
        },
        {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                    
        }
    )
}

export const useRejectRequest = () => {
    return useMutation(rejectRequest)
}