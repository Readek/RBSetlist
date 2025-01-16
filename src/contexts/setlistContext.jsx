import { useState } from "react";
import { createContext } from "react";
import { getDemoSetlist, getUserUploadSetlist } from "../data/ParseSetlist.mjs";
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

const SetlistContext = createContext();

function SetlistProvider({ children }) {

    /** @type {ReturnType<typeof useState<SetlistData>>} */
    const [ setlistData, setSetlistData ] = useState({setlist:[]});

    /** Parses and loads the Demo Setlist */
    async function loadDemoSetlist() {
        setSetlistData(await getDemoSetlist());
    }

    /**
     * Uses provided user setlist to parse it
     * @param {Object} data - Raw json data 
     */
    async function loadUserUploadSetlist(data) {
        setSetlistData(await getUserUploadSetlist(data));
    }

    return (
        <SetlistContext.Provider value={{
            setlistData: setlistData,
            loadDemoSetlist: loadDemoSetlist,
            loadUserUploadSetlist: loadUserUploadSetlist,
        }}>
            {children}
        </SetlistContext.Provider>
    )

}

export { SetlistContext, SetlistProvider };