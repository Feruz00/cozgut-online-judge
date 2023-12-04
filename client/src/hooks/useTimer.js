import { createContext, useContext, useEffect,  useState } from "react";


const TimerContext = createContext()

export default function TimerProvider({children}){
    const [time, setTime] = useState(new Date())
    const [show, setShow] = useState(false)
    
    useEffect( ()=>{
        const interval = setInterval( ()=>{
            setTime(new Date())
        }, 1000 )
        return ()=> clearInterval(interval)
    }, [] )

    useEffect( ()=>{
        const toggle = setTimeout( ()=>{
            setShow(false)
        }, 10000 )

        return clearTimeout(toggle)
    }, [show] )

    return <TimerContext.Provider value={{time, setShow}}>
        {children}
    </TimerContext.Provider>
}

export function useTime(){
    const context = useContext(TimerContext)
    return context
}