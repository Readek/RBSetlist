import { useContext } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SongInList from "../components/SetlistView/songInList";
import "../assets/setlistView.css";

export default function SetlistView() {

    const { t } = useTranslation();

    const { setlistData, setlistInfo } = useContext(SetlistContext);

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData.length == 0 && (<Navigate to={"/"} />)}

    <div id="setlistContent">

        <div id="setlistTopBar">

            <div id="setlistTopTitle">
                {setlistData.name
                ?
                    t("setlistTopTitle", {user: setlistInfo.name})
                :
                    t("setlistTopTitle", {user: setlistInfo.name})
                }
                
            </div>

            <div id="setlistTopRight">
                <div>
                    {t("setlistSongCount", {songCount: setlistData.length})}
                </div>
                <div>
                    {t("setlistSortedBy", {sortType: t("setlistSortArtist")})}
                </div>
            </div>
            
            
        </div>        

        <div id="setlistList">
            {setlistData.map(song => (
                <SongInList songData={song} key={song.reactId} />
            ))}
        </div>
        

    </div>

    </>)

}