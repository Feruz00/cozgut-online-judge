// import { Divider } from 'antd'
import React from 'react'
import {  RxAvatar, RxPinRight } from 'react-icons/rx'
import { useCurrentUser, useLogout } from '../features/auth/useAuth'
import Loading from '../ui/Loading'
import { Avatar } from 'antd'

const server = process.env.REACT_APP_SERVER
const Header = () => {
    const {logout} = useLogout()
    const {isAuthenticated, isLoading, user} = useCurrentUser()
    const className= 'text-2xl mx-2 cursor-pointer hover:text-color-grey-400'

    if(isLoading) return <Loading />
    return (
    <div
        className='px-6 py-3 flex flex-row justify-end items-center
        bg-neutral-600 text-white select-none
        '
    >
        
        {/* <h className='text-lg dark:text-white'>Heading</h> */}
        {
            isAuthenticated && (<div className='flex flex-row gap-3 items-center mr-4'>
                {
                    user?.avatar ? <Avatar src={`${server}/${user.avatar}`} /> :<RxAvatar className={className} />
                }
                <p className='text-white font-medium'>{user.username}</p>
            </div>
            )
        }
        
        <RxPinRight onClick={()=>logout()}  className={className}/>
        {/* <Divider /> */}
    </div>
  )
}

export default Header