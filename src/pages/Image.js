import React from "react"
import ImageComponent from "../components/ImageComponent"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API, getCookie } from "../api"
import { useQuery } from "react-query"


export default function Image() {

    const params = useParams()

    const getImage = async() => {
        return await axios.get(`${API}/dashboard/image/${params.id}`,{
            headers:{
                Authorization:`Bearer ${getCookie('ah')}`
            },                
            withCredentials:true            
        }) 
    }

    const image = useQuery('image', getImage)

    return (
        <>
            <ImageComponent params={params} image={image?.data?.data?.post} />
        </>
    )
}