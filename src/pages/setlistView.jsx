import { useContext } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SongInList from "../components/SetlistView/songInList";

export default function SetlistView() {

    const { t } = useTranslation();

    const { setlistData } = useContext(SetlistContext);

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData.setlist.length == 0 && (<Navigate to={"/"} />)}

    <div>

        {t("homeSongCount", {songCount: setlistData.setlist.length})}

        {setlistData.setlist.map(song => (
            <SongInList songData={song} />
        ))}

    </div>

    </>)

}