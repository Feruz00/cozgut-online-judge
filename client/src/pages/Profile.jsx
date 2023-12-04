import React from 'react'
import { useGetProfile } from '../features/auth/useAuth'
import Loading from '../ui/Loading'
import ShowUserProfile from '../components/ShowUserProfile'
import { Link } from 'react-router-dom'
import { RxGear } from 'react-icons/rx'
import { Button } from 'antd'
const Profile = () => {
    const {profile, isLoading} = useGetProfile()

    if(isLoading) return <Loading />
  return (
    <div className='mt-5 px-10'>
        
        <ShowUserProfile profile={profile} isShow={true} />
        {
                profile.role !== 'member' && (

                    <div className='w-full flex shadow px-5 py-3'>
                        <Link to="/settings">
                            <Button icon={ <RxGear/> }> Sazlamalar</Button>
                        </Link>
                    </div>
                )
            }
    </div>
  )
}

export default Profile