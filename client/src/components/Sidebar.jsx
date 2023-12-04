/* eslint-disable jsx-a11y/no-access-key */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {RxFramerLogo, 
   RxCodesandboxLogo, RxLayers, RxAccessibility,RxGear} from 'react-icons/rx'
import { Menu } from 'antd'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  // getItem(<NavLink to="dashboard" className='text-white hover:text-indigo-800'> Baş sahypa </NavLink>, 'dashboard', <RxBarChart />),
  // getItem(<NavLink to="news"> Bildirişler</NavLink>, 'news', <RxCalendar />),
  getItem(<NavLink to="sections"> Arhiw</NavLink>, 'sections', <RxLayers />),
  getItem(<NavLink to='contests'> Bäsleşikler</NavLink>, 'contests', <RxCodesandboxLogo /> ),
  getItem(<NavLink to="users"> Ulanyjylar</NavLink>, "users", <RxAccessibility />),
  getItem(<NavLink to="settings"> Sazlamalar</NavLink>, "settings", <RxGear/> )
];

const rootSubmenuKeys = ['dashboard', 'news', 'sections', "contests", "problems", "users", "settings"];
const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  
  return (
    <aside className='row-span-full flex flex-col items-center  bg-nft-black-2 text-white pt-10 w-full'>
        <div className='flex flex-col  justify-center mt-7 mb-3'>
            <p className='text-5xl  font-consolas'>Çözgüt</p>
            
            <p className='text-center text-xs font-consolas'>admin tarap</p>
        </div>
        {/* <RxFramerLogo className='text-6xl text-indigo-500 hover:text-indigo-600 transition-all duration-200 cursor-pointer' /> */}
        {/* <Typography.Title className='text-white'> Çözgüt - admin </Typography.Title> */}
        {/* // eslint-disable-next-line jsx-a11y/no-access-key */}
        <Menu
          accessKey={openKeys}
          mode="inline"
          theme='dark'
          className='bg-transparent text-base mt-6   '
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
        />
    </aside>
  )
}

export default Sidebar