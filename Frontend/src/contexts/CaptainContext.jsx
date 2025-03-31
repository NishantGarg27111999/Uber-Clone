import { createContext, useState } from "react";


export const captainDataContext=createContext();

function CaptainContext({children}){
    const [captain,setCaptain]=useState({});
    return (
        <captainDataContext.Provider value={{captain,setCaptain}}>
            {children}
        </captainDataContext.Provider>
    )
}

export default CaptainContext;