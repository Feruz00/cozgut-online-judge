/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-access-key */
import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import {RxBarChart, RxCodesandboxLogo, RxDoubleArrowUp, RxEnter, RxExit, RxLayers } from 'react-icons/rx';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai';
import { useCurrentUser, useLogout } from '../features/auth/useAuth';
function getItem(label, key, icon, children, type) {
      return {
        key,
        icon,
        children,
        label,
        type,
      };
    }
const AppLayout = () => {
    const {isAuthenticated} = useCurrentUser()
    const {logout} = useLogout()
    
    let items = [
      // getItem(<NavLink to="/" className='text-white hover:text-indigo-800'> Baş sahypa </NavLink>, 'dashboard', <RxBarChart />),
      getItem(<NavLink to="contests" className='text-white hover:text-indigo-800'> Bäsleşikler </NavLink>, 'contests', <RxCodesandboxLogo /> ),
      getItem(<NavLink to="sections"> Arhiw</NavLink>, 'sections', <RxLayers />),
      // getItem(<NavLink to="problems"> Mysallar</NavLink>, 'problems', <RxCode />),
      getItem(<NavLink to="submissions"> Ugratmalar</NavLink>, 'submissions', <RxDoubleArrowUp />),
      
      getItem(<NavLink to="login"> Içeri gir</NavLink>, "login", <RxEnter />),
    ];
    
    const rootSubmenuKeys = ['dashboard', 'sections', "contests", "problems", "users", "settings", "login"];
  
    if(isAuthenticated){

      items[items.length - 1] = getItem(<NavLink to="profile" > Şahsy otag</NavLink>, "user", <AiOutlineUser />)
      items.push(getItem( <Button className='bg-transparent border-none' onClick={()=>logout()}>Ulgamdan çyk</Button>, 'logout', <RxExit  /> ) )
    } 
      
    else 
      items[items.length - 1] = getItem(<NavLink to="login"> Içeri gir</NavLink>, "login", <RxEnter />)

      //   const [openKeys, setOpenKeys] = useState(['sections']);
    
      // const onOpenChange = (keys) => {
      //   console.log(keys)
      // const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      // if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      //   setOpenKeys(keys);
      // } else {
      //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      // }
    // };
    
    return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen m-0 p-0'>
        <header className=' shadow w-full flex bg-color-grey-50 py-1 justify-between   px-6 items-center'>
            <Link to="/" className='text-gray-900  no-underline mr-10'>
                <h1 className='text-2xl font-light font-poppins'>Çözgüt</h1>
                <p className='text-xs'>Onlaýn bäsleşik platformasy</p>
            </Link>
            
            <div className='flex-1 '>
              <Menu
                  inlineCollapsed={false}
                  // multiple
                  // accessKey={openKeys}
                  defaultOpenKeys={['sections']}
                  mode="horizontal"
                  className='bg-transparent border-none'
                  // openKeys={openKeys}
                  theme='light'
                  // onOpenChange={onOpenChange}
                  items={items}
              />
            </div>
            
            
        </header>
        <main className='overflow-y-auto'>
            <Outlet />
        </main>
        <footer className='flex justify-center flex-col items-center py-1 text-sm bg-nft-gray-3 text-white'>
            <p>
                Çözgüt - onlaýn bäsleşik platformasy. &copy; {new Date().getFullYear()} ýyl
            </p>
            <p>
                Ähli hukuklar goraglanan.
            </p>
        </footer>
    </div>
  )
}

export default AppLayout