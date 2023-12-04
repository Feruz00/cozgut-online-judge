import { Avatar } from 'antd';
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { AiOutlineUser} from 'react-icons/ai'
import { CartesianGrid, Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts'
const server = process.env.REACT_APP_SERVER

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-color-grey-100 px-3 py-2 rounded text-xs ">
          <p className="label">Sene:{`${moment(label).format('DD/MM/YY HH:mm')} `}</p>
          <p>Alan reýtingi:  {payload[0].value} </p>
        </div>
      );
    }
  
    return null;
  };
const ShowUserProfile = ({profile = {}}) => {
    // const {} = useUserSubmmissions()
    const dateFormatter = date => {
        return moment(date).format('DD/MM/YY HH:mm');
    };
    const data = profile?.ratings?.map( i=>({dataora: i.contest.start_time, valore: i.rating}) )
    if(data?.length )  
        data.forEach(d => {
            if(d?.dataora)
                d.dataora = moment(d.dataora).valueOf(); // date -> epoch
        });
    
    const subs = useMemo( ()=>{
        // console.log(profile)
        return [
            {
                name: 'Dogry Çözüw',
                value: profile?.submissions?.filter( i=> i.accepted ).length,
                color:"#5D9C59"
            },
            {
                name: 'Komplýasiýa ýalňyşlygy',
                value: profile?.submissions?.filter( i=> i.verdict === 'COMPILATION ERROR' ).length,
                color: '#949b96'
            },
            {
                name: 'Näsazlyk bolmagy',
                value: profile?.submissions?.filter( i=> i.verdict === 'RUNTIME ERROR' ).length,
                color: "#eab308",
            },
            {
                name: 'Nädogry jogap',
                value: profile?.submissions?.filter( i=> i.verdict === 'WRONG ANSWER' ).length,
                color: "#d42121",
            },
            {
                name: 'Wagt çäkli',
                value: profile?.submissions?.filter( i=> i.verdict === 'TIME LIMIT' ).length,
                color: "#ee632c",
            },
            {
                name: 'Möçber çäkli',
                value: profile?.submissions?.filter( i=> i.verdict === 'MEMORY LIMIT' ).length,
                color: "#9027ec",
            },
            
        ].filter( i=> i.value )
    } , [profile])

    // console.log(subs)
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-row px-5 shadow py-3 gap-3 items-center rounded'>
                {
                    profile?.avatar ? <Avatar size={64} src={ <img src={`${server}/${profile.avatar}`} alt='profile' className='object-fit' /> }  /> : <Avatar size={64} icon={ <AiOutlineUser />} />
                }
                
                <div className='text-sm font-medium'>
                    <p> <span className='font-bold'>Login:</span> {profile.username} </p>
                    <p> <span  className='font-bold'>Email:</span> {profile.email} </p>
                    {
                        profile?.ratings?.length > 0  && (

                            <p> <span  className='font-bold'>Reýting:</span> {profile.ratings[profile.ratings.length - 1].rating}
                             (<span className='font-bold'> max:</span> {profile.ratings.reduce( (prev, current)=>{
                                if(prev < current.rating) return current.rating
                                return prev
                             }, 0 )})</p>
                        )
                    }
                    
                </div>
            </div>
            <div className='w-full shadow px-5 py-3 flex gap-4 flex-col'>
                <h3>Reýting netijeler:</h3>
                <div className='w-2/3 h-[10rem] shadow px-10 py-2'>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            data={ data }
                        >
                            <Line type="monotone" dataKey="valore" stroke="#8884d8" strokeWidth={1} activeDot={{ r: 7 }} />
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis 
                                dataKey={'dataora'}
                                domain={ data.length>0 ?  [data[0]?.dataora, data[data.length - 1].dataora]: []}
                                scale="time"
                                type="number"
                                tickFormatter={dateFormatter} 
                            />
                            <YAxis padding={{ top: 20, bottom: 20 }} />
                            <Tooltip content={<CustomTooltip />}  />
                            {/* <Legend /> */}

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='w-full h-[20rem] shadow px-5 py-3 flex gap-4 flex-col'>
                <h3 className='font-medium text-lg '>Ähli ugratmalarynyň netijesi:</h3>
                <div className='w-2/3 shadow px-10 py-2'>

                    <ResponsiveContainer  width="100%" height={240}>
                        <PieChart >
                        <Pie
                            data={subs}
                            cx="50%"
                            cy="50%"
                            fill="#8884d8"
                            nameKey="name" 
                            dateKey="value"
                            paddingAngle={7} 
                            innerRadius={85}
                            outerRadius={110}
                        >
                             {subs.map(entry=><Cell fill={entry.color} stroke={entry.color} key={entry.value} />)}
                        </Pie>
                        <Tooltip/>
                        <Legend verticalAlign="middle" align="right" width="30%" layout="vertical" iconSize={15} 
                        iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
  )
}

export default ShowUserProfile