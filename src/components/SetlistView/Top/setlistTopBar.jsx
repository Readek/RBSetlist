import { useContext, useEffect, useState } from "react";
import { SetlistContext } from "../../../contexts/setlistContext";
import { useTranslation } from "react-i18next";
import "../../../assets/SetlistView/Top/setlistTopBar.css"
/** @import { SetlistData, SetlistInfo } from "../../../data/TypeDefinitions.mjs" */

export default function SetlistTopBar() {

    const { t } = useTranslation();

    /** @type {{setlistData: SetlistData[], setlistInfo: SetlistInfo}} */
    const { setlistData, setlistInfo, addToSetlistInfo } = useContext(SetlistContext);

    const [selectedSort, setSelectedSort] = useState("SongName");
    const [filterInput, setFilterInput] = useState("");
    
    useEffect(() => {
        addToSetlistInfo("sortType", selectedSort);        
    }, [selectedSort])

    useEffect(() => {
        addToSetlistInfo("textFilter", filterInput);
    }, [filterInput])

    return(

    <div id="setlistTopBarContent">
    
    <div id="setlistTopBar">

        <div id="setlistTopTop">
            
            <div id="setlistTopTitle">
                {setlistInfo.name}
            </div>

            <div id="setlistTopRight">

                <div>
                    {t("setlistSongCount", {count: setlistData.length})}
                </div>

                <div>
                    {t("setlistSortedBy", {
                        sortType: t("setlistSort"+setlistInfo.sortType).toLocaleLowerCase()
                    })}
                </div>

            </div>

        </div>

        <select
            id="setlistSortSelect"
            value={selectedSort}
            onChange={e => setSelectedSort(e.target.value)}
        >
            <option value="SongName">{t("setlistSortSongName")}</option>
            <option value="Artist">{t("setlistSortArtist")}</option>
            <option value="Year">{t("setlistSortYear")}</option>
        </select>

        <input
            type="text"
            id="setlistTextFilterInput"
            value={filterInput}
            onChange={e => setFilterInput(e.target.value)}
            placeholder={t("setlistTextFilterPlaceholder")}
        />

    </div>

    </div>

    )

}