import {createContext, useState} from "react"

export const ProfilContext = createContext();
export const ProfilContextProvider = ({children}) => {
    const [profil, setProfil] = useState({isLogged: false})
    const login = function (user) {
        setProfil({...user, isLogged: true})
    }
    const logout = function () {
        setProfil({isLogged: false})
    }
    return <ProfilContext.Provider value={{profil, login, logout}}>
        {children}
    </ProfilContext.Provider>
}