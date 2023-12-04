import React from 'react'
import { useCurrentUser, useGetAccount } from '../features/auth/useAuth'
import Loading from '../ui/Loading'
import ShowUserProfile from '../components/ShowUserProfile'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const User = () => {
    const {isLoading, account} = useGetAccount()
    const {user, isAuthenticated, isLoading: isUserLoading} = useCurrentUser()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(isLoading || isUserLoading) return
        if(!isAuthenticated) return
        if(user._id === account._id) return navigate('/profile', {replace: true})
        return
    }, [user, isLoading, navigate, isAuthenticated, account, isUserLoading])

    if(isLoading || isUserLoading) return <Loading />

    return (
        <div className='mt-5 px-10'>
        
            <ShowUserProfile profile={account} />
        </div>
  )
}

export default User