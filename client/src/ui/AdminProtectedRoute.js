import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../features/auth/useAuth"
import { useEffect } from "react"
import Loading from "./Loading"

const AdminProtectedRoute = ({children}) => {
    const {isLoading, isAuthenticated, user} = useCurrentUser()
    const navigate = useNavigate()
    
    useEffect( ()=>{
        document.title = 'Admin sahypa'
    } , [])

    useEffect( ()=>{
        if(isLoading) return
        if(!isAuthenticated && !isLoading) navigate('/login', {replace: true})
        if(user?.role !== 'admin' )  navigate('/login', {replace: true})
    },[isAuthenticated, navigate, isLoading, user] )
  
    if(isLoading) return <Loading />
  
    if(isAuthenticated) return (
        children
    )
}

export default AdminProtectedRoute