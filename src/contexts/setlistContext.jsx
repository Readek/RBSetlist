import { useEffect, useState } from "react";
import { createContext } from "react";
import { getDemoSetlist, getUserUploadSetlist } from "../data/ParseSetlist.mjs";
import { sortSetlist } from "../data/SortSetlist.mjs";
import { useTranslation } from "react-i18next";
import { supabase } from "./authContext";
import { searchByText } from "../data/FilterSetlist.mjs";
/** @import { SetlistData, SetlistInfo, SetlistActive } from "../data/TypeDefinitions.mjs" */

const SetlistContext = createContext();

const setsUrl = "https://"+import.meta.env.VITE_SUPABASE_PROJECT_ID+".supabase.co/storage/v1/object/public/setlists/";

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
        const userSetlist = await getUserUploadSetlist(data)
        setSetlistData(userSetlist);
        addToSetlistInfo("name", t("setlistTopTitleUpload"));
        return userSetlist;
    }

    /**
     * Gets user setlist from database and parses it
     * @param {String} setlistUrl - Url used to find user setlist
     */
    async function loadUserSetlist(setlistUrl) {

        const { data, error } = await supabase
            .from('setlists')
            .select()
            .eq('url', setlistUrl)
        if (error) {
            console.log(error);
        } else {

            // if data for requested url doesnt exist
            if (!data[0]) {
                setSetlistData(null);
                return
            }

            const userSetlist = await (
                await fetch(
                    setsUrl + data[0].dataurl,
                    {cache: "no-store"}
                )
            ).json();

            setSetlistData(userSetlist);

            addToSetlistInfo("name", data[0].name);
            addToSetlistInfo("desc", data[0].description);

        }

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

    useEffect(() => {

        if (setlistInfo.textFilter) {
            setSetlistActive([{
                name: t("setlistListSearchCat"),
                songs: searchByText(setlistInfo.textFilter, [...setlistData])
            }])
        } else {
            // to reorder active setlist array
            setSetlistActive(sortSetlist([...setlistData], setlistInfo.sortType));
        }

    }, [setlistInfo])

    return (
        <SetlistContext.Provider value={{
            setlistData: setlistData,
            loadDemoSetlist: loadDemoSetlist,
            loadUserUploadSetlist: loadUserUploadSetlist,
            loadUserSetlist: loadUserSetlist,
            setlistInfo: setlistInfo, addToSetlistInfo: addToSetlistInfo,
            setlistActive: setlistActive,
        }}>
            {children}
        </SetlistContext.Provider>
    )

}

export { SetlistContext, SetlistProvider };