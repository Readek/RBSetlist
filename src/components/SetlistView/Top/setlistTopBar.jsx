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
    
    useEffect(() => {
        addToSetlistInfo("sortType", selectedSort);
    }, [selectedSort])

    return(

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
        </select>

    </div>

    )

}