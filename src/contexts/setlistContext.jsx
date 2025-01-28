import { useEffect, useState } from "react";
import { createContext } from "react";
import { getDemoSetlist, getUserUploadSetlist } from "../data/ParseSetlist.mjs";
import { sortSetlist } from "../data/SortSetlist.mjs";
import { useTranslation } from "react-i18next";
/** @import { SetlistData, SetlistInfo, SetlistActive } from "../data/TypeDefinitions.mjs" */

const SetlistContext = createContext();

function SetlistProvider({ children }) {

    const { t } = useTranslation();

    /** @type {ReturnType<typeof useState<SetlistData[]>>} */
    const [ setlistData, setSetlistData ] = useState([]);

    /** @type {ReturnType<typeof useState<SetlistInfo>>} */
    const [ setlistInfo, setSetlistInfo ] = useState({});

    /** @type {ReturnType<typeof useState<SetlistActive[]>>} */
    const [ setlistActive, setSetlistActive ] = useState([]);

    /** Parses and loads the Demo Setlist */
    async function loadDemoSetlist() {
        setSetlistData(await getDemoSetlist());
        addToSetlistInfo("name", t("setlistTopTitleDemo"));
    }

    /**
     * Uses provided user setlist to parse it
     * @param {Object} data - Raw json data 
     */
    async function loadUserUploadSetlist(data) {
        setSetlistData(await getUserUploadSetlist(data));
        addToSetlistInfo("name", t("setlistTopTitleUpload"));
    }

    /**
     * Updates the main setlist info object
     * @param {String} keyName 
     * @param {*} value 
     */
    function addToSetlistInfo(keyName, value) {
        setSetlistInfo(ato => addToObject(ato, keyName, value));
    }

    /**
     * This makes React to wait between object updates so nothing gets lost
     * oh react the things i do for you
     * @param {*} object - Original object
     * @param {String} keyName - Value to update
     * @param {*} value - New data to add to value
     */
    function addToObject(object, keyName, value) {
        const tempData = {...object};
        tempData[keyName] = value;
        return tempData;
    }

    // to reorder active setlist array
    useEffect(() => {

        if (setlistInfo.textFilter) {
            const fText = setlistInfo.textFilter
            const newArr = [...setlistData];

            const newERArr = newArr.filter(song =>
                song.name.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
                || song.artist.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
                || song.album.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
            )

            setSetlistActive([{
                name: t("setlistListSearchCat"),
                songs: newERArr
            }])
        } else {
            setSetlistActive(sortSetlist([...setlistData], setlistInfo.sortType));
        }

    }, [setlistInfo])

    return (
        <SetlistContext.Provider value={{
            setlistData: setlistData,
            loadDemoSetlist: loadDemoSetlist,
            loadUserUploadSetlist: loadUserUploadSetlist,
            setlistInfo: setlistInfo, addToSetlistInfo: addToSetlistInfo,
            setlistActive: setlistActive,
        }}>
            {children}
        </SetlistContext.Provider>
    )

}

export { SetlistContext, SetlistProvider };