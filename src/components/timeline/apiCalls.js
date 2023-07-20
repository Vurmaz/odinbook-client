import axios from "axios"
import { useMutation } from "react-query"
import { API, getCookie } from "../../api"

    export const getTimeline = async (page) => {
        return await axios.get(`${API}/dashboard/timeline/${getCookie(' u')}?page=${page}`, {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true
        })        
    }
    
    export const getComments = async(post, page) => {
        const response = await axios.get(`${API}/comment/${post._id}?page=${page}`, {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },
            withCredentials:true
        })
        return response      
    }

    export const isPostLikedFunc = async(post) => {
        const isLiked = await axios.post(
            `${API}/dashboard/like/post/${post._id}`, 
            { id:`${getCookie(' u')}`}, 
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            })
        return isLiked
    }

    const fetchLikePost = async(post) => {
        return await axios.post(
            `${API}/dashboard/like/${post._id}`, 
            { id:`${getCookie(' u')}`}, 
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },               
                withCredentials:true 
            })
    }

    export const useLikePost = (setIsPostLiked, setPostLikeCount) => {
        return useMutation(fetchLikePost, 
            { 
                onSuccess: (data) => {
                    if(data.data.msg === 'LIKED'){
                        setIsPostLiked(true)
                        
                    }
                    else if(data.data.msg === 'DISLIKED'){
                        setIsPostLiked(false)
                    }
                    setPostLikeCount(data.data.post.likes.length)
                }
            }
        )
    }

    export const getUserAvatar = async() => {
        const response = await axios.get(`${API}/dashboard/user/user/${getCookie(' u')}`, {
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true                
        })
        return response.data
    }

    const fetchCreatePost = async(data) => {     
           console.log(data)
        return await axios.post(
            `${API}/dashboard/create`,
            {
                content:data.post,
                author:`${getCookie(' u')}`,
                image: data?.imgUrl?.length > 0 ? data.imgUrl  : null 
            },
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },
                withCredentials:true
            }
        )
    }

    export const useCreatePost = () => {
        return useMutation(fetchCreatePost)
    }

    const fetchCreateComment = async(data) => {
        return await axios.post(
            `${API}/comment/create`,
            { 
                "content": data.commentText, 
                "author": data.author, 
                "postId": data.postId 
            }, 
            {
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },
                withCredentials:true
            }
        )
    }

    export const useCreateComment = () => {
        return useMutation(fetchCreateComment, { onSuccess:() => window.location.reload() })
    }

    const fetchLikeComment = async(comment) => {    
        return await axios.post(
            `${API}/comment/likes/${comment._id}`, 
            { id:`${getCookie(' u')}`}, 
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },               
                withCredentials:true 
        }) 
        
    }

    export const useLikeComment = (setIsCommentLiked, setCommentCount) => {
        return useMutation(
            fetchLikeComment,
            {
                onSuccess: (data) => {
                    if(data.data.msg === 'LIKED'){
                        setIsCommentLiked(true)
                        
                    }
                    else if(data.data.msg === 'DISLIKED'){
                        setIsCommentLiked(false)
                    }
                    setCommentCount(data.data.comment.likes.length)
                }
            }
        )
    }

    export const isCommentLikedFunc = async(comment) => {
        const isLiked = await axios.post(
            `${API}/comment/isLiked/${comment._id}`, 
            { id:`${getCookie(' u')}`}, 
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            })
        return isLiked
    }   

    const fetchDeletePost = async(post) => {
        return await axios.delete(
            `${API}/dashboard/${post._id}`,
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            }            
        )
    }

    export const useDeletePost = () => {
        return useMutation(fetchDeletePost)
    }

    const fetchDeleteComment = async(comment) => {
        console.log(comment)
        return await axios.delete(
            `${API}/comment/delete/${comment._id}`,
            { 
                headers:{
                    Authorization:`Bearer ${getCookie('ah')}`
                },                
                withCredentials:true 
            }             
        )
    }

    export const useDeleteComment = () =>{
        return useMutation(fetchDeleteComment)
    }