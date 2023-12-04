import React, { useEffect } from 'react'
import {Tabs} from 'antd'
import { useSearchParams } from 'react-router-dom'
import TagPage from '../../features/problems/TagPage'
import LanguagesPage from '../../features/settings/LanguagesPage'
import Admins from '../../features/settings/Admins'
import ChangeUsername from '../../features/profile/ChangeUsername'
import UploadAvatar from '../../features/profile/UploadAvatar'
import ChangePassword from '../../features/profile/ChangePassword'
const AdminSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect( ()=>{
    if(!searchParams.get('page')) setSearchParams( searchParams.set('page', 'admins') )
  } ,[searchParams, setSearchParams])
  return (
    <div className="mt-4 px-10 flex flex-col gap-4">
      <div className="shadow px-3 py-2">
        <Tabs 
          defaultActiveKey={searchParams.get('page') || 'admins' }
          onChange={key=> { searchParams.set('page', key ); setSearchParams(searchParams) }}
          items={[
            {
              key: 'admins',
              label: "Adminstatorlar"
            },
            {
              key: 'tags',
              label: "Tegler"
            },
            {
              key: 'langs',
              label: "Prog. diller"
            },
            {
              key: 'changes',
              label: "Üýtgetmeler"
            },
          ]}
        />
      </div>
      <div>
        {
          searchParams.get('page') === 'admins' && <Admins />
        },
        {
          searchParams.get('page') === 'tags' && <TagPage />
        }
        {
          searchParams.get('page') === 'langs' && <LanguagesPage/>
        }
        {
          searchParams.get('page') === 'changes' && <div className='flex flex-col gap-3'>
            <ChangeUsername />
            <UploadAvatar />
            <ChangePassword />
          </div>
        }
      </div>
    </div>
  )
}

export default AdminSettings