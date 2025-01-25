import { useContext } from "react";
import { SetlistContext } from "../../../contexts/setlistContext";
import { useTranslation } from "react-i18next";
import SongInList from "./songInList";
import "../../../assets/SetlistView/List/setlistList.css"
/** @import { SetlistActive, SetlistInfo } from "../data/TypeDefinitions.mjs" */

export default function SetlistList() {

    const { t } = useTranslation();

    /** @type {{setlistActive: SetlistActive[], setlistInfo: SetlistInfo}} */
    const { setlistActive, setlistInfo } = useContext(SetlistContext);
    
    return(

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

    )

}