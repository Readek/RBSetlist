import { useState } from "react";
import { createContext } from "react";
import { getDemoSetlist, getUserUploadSetlist } from "../data/ParseSetlist.mjs";
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

const SetlistContext = createContext();

function SetlistProvider({ children }) {

    /** @type {ReturnType<typeof useState<SetlistData>>} */
    const [ setlistData, setSetlistData ] = useState([]);

    const [ setlistInfo, setSetlistInfo ] = useState({});

    /** Parses and loads the Demo Setlist */
    async function loadDemoSetlist() {
        setSetlistData(await getDemoSetlist());
        addToSetlistInfo("name", "Demo")
    }

    /**
     * Uses provided user setlist to parse it
     * @param {Object} data - Raw json data 
     */
    async function loadUserUploadSetlist(data) {
        setSetlistData(await getUserUploadSetlist(data));
    }

    /**
     * Updates the main setlist info object
     * @param {String} keyName 
     * @param {*} value 
     */
    function addToSetlistInfo(keyName, value) {
        const newArr = {...setlistInfo};
        newArr[keyName] = value
        setSetlistInfo(newArr);
    }

    return (
        <SetlistContext.Provider value={{
            setlistData: setlistData,
            loadDemoSetlist: loadDemoSetlist,
            loadUserUploadSetlist: loadUserUploadSetlist,
            setlistInfo: setlistInfo,
        }}>
            {children}
        </SetlistContext.Provider>
    )

}

export { SetlistContext, SetlistProvider };