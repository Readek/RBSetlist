import { createContext, useState } from "react";
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

const ActiveSongContext = createContext();

function ActiveSongProvider({ children }) {

    /** @type {ReturnType<typeof useState<SetlistData>>} */
    const [ activeSong, setActiveSong ] = useState();

    return <ActiveSongContext.Provider value={{
        activeSong: activeSong, setActiveSong: setActiveSong
    }}>
        {children}
    </ActiveSongContext.Provider>
    
}

export { ActiveSongContext, ActiveSongProvider };