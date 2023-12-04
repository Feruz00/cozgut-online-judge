import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../features/auth/useAuth"
import { useEffect } from "react"
import Loading from "./Loading"

const ProtectedRoute = ({children}) => {
    const {isLoading, isAuthenticated} = useCurrentUser()
    const navigate = useNavigate()
  
    useEffect( ()=>{
        if(!isAuthenticated && !isLoading) navigate('/login', {replace: true})
    },[isAuthenticated, navigate, isLoading] )
  
    if(isLoading) return <Loading />
  
    if(isAuthenticated) return (
        children
    )
}

export default ProtectedRoute