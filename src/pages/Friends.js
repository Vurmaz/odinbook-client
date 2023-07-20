import React, { useState } from "react"
import Grid from '@mui/material/Grid'
import MyFriends from "../components/friends/MyFriends"
import IncomingRequests from "../components/friends/IncomingRequests"
import ReccomendedFriends from '../components/friends/ReccomendedFriends'
import Header from "../components/header/Header"
import { shuffle } from "../api"
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import SimpleSnackbar from "../components/Snackbar"
import SendedRequests from "../components/friends/SendedRequests"
import { useQuery } from "react-query"
import { 
    getAllFriends, 
    getRequests, 
    getReccomends, 
    useSendRequest, 
    getSendedRequests, 
    useUndoRequest, 
    useAcceptRequest, 
    useRejectRequest ,
    useDeleteFriend
} from "../components/friends/apiCalls"

export default function Friends() {
    
    const navigate = useNavigate()
    const params = useParams()
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState('')
    
    const clickSnackbar = (message) => {
        setSnackbarMessage(message)
        setOpenSnackbar(true)
    }
    
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarMessage('')
        setOpenSnackbar(false)
    }

    const navigateProfile = (data) => {
        navigate(`/profile/${data._id}`)
    }
    
    const allFriends = useQuery(
        'allFriends', 
        () => getAllFriends(params),
    )
    const requests = useQuery(
        'requests', 
        () => getRequests(params),
        {         
            onSuccess: (data) => shuffle(data.data.user)
        }
    )

    const reccomends = useQuery(
        'reccomends', 
        () => getReccomends(params),
        { 
            onSuccess: (data) => shuffle(data.data.users)
        }
    )

    const sendedRequests = useQuery(
        'sendedRequests', 
        getSendedRequests,
    )
    
    const { mutate : sendARequest } = useSendRequest()

    const sendRequest = async(data) =>{
        await sendARequest(data)
        await reccomends.refetch()
        await sendedRequests.refetch()
        await clickSnackbar('Request Sended')
    }

    const { mutate: undoARequest }  = useUndoRequest()

    const undoRequest = async(data) => {
        await undoARequest(data)
        await sendedRequests.refetch()
        await reccomends.refetch()
        await clickSnackbar('Request has withdrawn')
        
    }
    const { mutate: acceptARequest } = useAcceptRequest()

    const acceptRequest = async(data) => {
        await acceptARequest(data)
        await requests.refetch()
        await allFriends.refetch()
        await clickSnackbar(`${data.username} is now your friend`)
    }

    const { mutate : rejectARequest } = useRejectRequest()
    
    const rejectRequest = async(data) => {
        await rejectARequest(data)
        await requests.refetch()
        await reccomends.refetch()
        await clickSnackbar(`You rejected ${data.username}'s request`)  
    }

    const { mutate : deleteAFriend } = useDeleteFriend()

    const deleteFriend = async(data) => {
        await deleteAFriend(data)
        await allFriends.refetch()
        await reccomends.refetch()
        await clickSnackbar('Friend has been deleted')
    }


    return(
        <> 
        <Header/>
            <Grid container spacing={1}>                
                <ReccomendedFriends 
                    reccomends={reccomends?.data?.data?.users} 
                    btn1Action={sendRequest} 
                    btn2Action={navigateProfile}
                    usernameAction={navigateProfile}
                    isReccomendsLoading={reccomends?.isLoading}
                /> 
                <MyFriends 
                    allFriends={allFriends?.data?.data?.friends} 
                    btn1Action={navigateProfile}
                    btn2Action={deleteFriend} 
                    usernameAction={navigateProfile}
                    isAllFriendsLoading={allFriends?.isLoading}
                /> 
                {
                    requests?.data?.data?.user?.length < 1 
                    ?
                    null
                    : 
                    <IncomingRequests 
                        requests={requests?.data?.data?.user} 
                        btn1Action={acceptRequest} 
                        btn2Action={rejectRequest} 
                        usernameAction={navigateProfile}
                        isRequestsLoading={requests?.isLoading}
                    /> 
                }
                {
                    sendedRequests?.data?.data?.users?.length < 1 
                    ?
                    null
                    : 
                    <SendedRequests 
                        sendedRequests={sendedRequests?.data?.data?.users}
                        btn1Action={navigateProfile} 
                        btn2Action={undoRequest}    
                        usernameAction={navigateProfile} 
                        isSendedRequestsLoading={sendedRequests?.isLoading}                       
                    /> 
                }                
                <SimpleSnackbar 
                    openSnackbar={openSnackbar} 
                    clickSnackbar={clickSnackbar} 
                    closeSnackbar={closeSnackbar} 
                    message={snackbarMessage} 
                />
            </Grid> 
        </>
    )
}

const CardHolder = styled(Grid)(({ theme }) => ({
    width:'100%',
    height:'490px',
    marginTop:'5rem',
    color:'white',
    overflow:'auto',
    marginInline:'auto',
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    gap:'5%',
    borderRadius:'0 5px 5px 5px',
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    border:'2px solid black',
}))

const CardHolderText = styled(Typography)(({ theme }) => ({
    position:'absolute', 
    color:'white',
    marginTop:'-4.2rem',
    padding:'1rem',
    marginLeft:'-0.7rem',
    borderRadius:'5px 5px 0 0',
    background:theme.palette.primary.main,
    border:'1px solid black',
    borderBottom:'none'    
}))

export { CardHolder, CardHolderText }
