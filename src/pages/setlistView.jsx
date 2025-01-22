import { useContext, useEffect } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SongInList from "../components/SetlistView/songInList";
import "../assets/setlistView.css";
/** @import { SetlistActive, SetlistInfo } from "../data/TypeDefinitions.mjs" */

export default function SetlistView() {

    const { t } = useTranslation();

    /** @type {{setlistActive: SetlistActive, setlistInfo: SetlistInfo}} */
    const { setlistData, setlistActive, setlistInfo, addToSetlistInfo } = useContext(SetlistContext);

    useEffect(() => {
        addToSetlistInfo("sortType", "Artist");
    }, [])

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData.length == 0 && (<Navigate to={"/"} />)}

    <div id="setlistContent">

        <div id="setlistTopBar">

            <div id="setlistTopTitle">
                {setlistInfo.name}
            </div>

            <div id="setlistTopRight">
                <div>
                    {t("setlistSongCount", {count: setlistActive.reduce(
                        (acu, val) => acu + val.songs.length, 0
                    )})}
                </div>
                <div>
                    {t("setlistSortedBy", {sortType: t("setlistSort"+setlistInfo.sortType)})}
                </div>
            </div>

        </div>

        <div id="setlistList">
            {setlistActive.map(category => (

                <div className="setlistListCategory" key={category.name}>

                    <div className="setlistListCategoryHeader">

                        <span className="setlistListCategoryName">
                            {category.name}
                        </span>

                        <span className="setlistListCategorySecon">
                            {t("setlistListCatCount", {count: category.songs.length})}
                        </span>

                    </div>

                    <div className="setlistListCategorySongs">
                        {category.songs.map(song => (
                            <SongInList
                                songData={song}
                                sortType={setlistInfo.sortType}
                                key={song.reactId}
                            />
                        ))}
                    </div>

                </div>

            ))}
        </div>

    </div>

    </>)

}