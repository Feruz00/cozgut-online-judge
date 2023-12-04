import React, { createContext } from 'react'
import { useCurrentUser } from '../features/auth/useAuth'
import Loading from '../ui/Loading'
import { useContext } from 'react'

const UserContext = createContext()

const AuthContext = ({children}) => {
    const  {user, isAuthenticated, isLoading} = useCurrentUser()

    if(isLoading) return <div className='h-screen w-full flex items-center justify-center'>
        <Loading />
    </div>

    return <UserContext.Provider value={{user, isAuthenticated}}>
        {children}
    </UserContext.Provider>
}

export const User = ()=>{
    const context = useContext(UserContext)
    return context
}

export default AuthContext