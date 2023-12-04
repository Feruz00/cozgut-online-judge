
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()

const DarkModeProvider = ({children})=>{
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

    useEffect(()=>{
        if(isDarkMode){
            document.documentElement.classList.add('dark')
            // document.documentElement.classList.remove('lig')
        }
        else{
            document.documentElement.classList.remove('dark')
            // document.documentElement.classList.add('light-mode')
            
        }
    },[isDarkMode])

    const toggleDarkMode = ()=>{
        setIsDarkMode(isDark=>!isDark)
    }

    return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
}

const  useDarkMode= ()=>{
    const context = useContext(DarkModeContext)
    if(context===undefined) throw new Error('DarkModeContext was used outside of DarkMode')
    return context
}

export {DarkModeProvider, useDarkMode}