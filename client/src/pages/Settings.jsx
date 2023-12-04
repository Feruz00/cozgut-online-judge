import React from 'react'
import { useGetProfile } from '../features/auth/useAuth'
import Loading from '../ui/Loading'
import ChangeUsername from '../features/profile/ChangeUsername'
import UploadAvatar from '../features/profile/UploadAvatar'
import ChangePassword from '../features/profile/ChangePassword'

const Settings = () => {
    const {isLoading, profile} = useGetProfile()
    
    if(isLoading) return <Loading />
  return (
    <div className='mt-5 px-10 flex flex-col gap-5'>
        <div className=' shadow px-4 py-2'>
            <h2 className=''> Sazlamalar: </h2>
        </div>

        <ChangeUsername profile={profile} />
        <UploadAvatar />
        <ChangePassword />
    </div>
  )
}

export default Settings