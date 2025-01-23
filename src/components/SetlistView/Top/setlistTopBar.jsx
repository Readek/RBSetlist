import { useContext, useEffect } from "react";
import { SetlistContext } from "../../../contexts/setlistContext";
import { useTranslation } from "react-i18next";
import "../../../assets/SetlistView/Top/setlistTopBar.css"
/** @import { SetlistData, SetlistInfo } from "../../../data/TypeDefinitions.mjs" */

export default function SetlistTopBar() {

    const { t } = useTranslation();

    /** @type {{setlistData: SetlistData[], setlistInfo: SetlistInfo}} */
    const { setlistData, setlistInfo, addToSetlistInfo } = useContext(SetlistContext);

    useEffect(() => {
        addToSetlistInfo("sortType", "Artist");
    }, [])

    return(

    <div id="setlistTopBar">

        <div id="setlistTopTitle">
            {setlistInfo.name}
        </div>

        <div id="setlistTopRight">

            <div>
                {t("setlistSongCount", {count: setlistData.length})}
            </div>

            <div>
                {t("setlistSortedBy", {sortType: t("setlistSort"+setlistInfo.sortType)})}
            </div>

        </div>

    </div>

    )

}