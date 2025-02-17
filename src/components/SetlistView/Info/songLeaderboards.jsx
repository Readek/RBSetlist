import { useContext, useEffect, useState } from "react"
import { ActiveSongContext } from "../../../contexts/activeSongContext";
import { fetchLeaderboards } from "../../../data/FetchLeaderboards.mjs";
import SongLeadEntry from "./songLeadEntry";
import "../../../assets/SetlistView/Info/songLeaderboards.css"
import { useTranslation } from "react-i18next";
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

export default function SongLeaderborards() {

    const { t } = useTranslation();

    /** @type {{activeSong: SetlistData}} */
    const { activeSong } = useContext(ActiveSongContext);

    const [ leaders, setLeaders ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {

        setIsLoading(true);

        const leadsRes = fetchLeaderboards(activeSong.songid, 10);

        leadsRes.then((res) => {
            setLeaders(res);
            setIsLoading(false);
        })

    }, [activeSong])
  
    return(

    <div id="songLeaderboardsContent">

        <div id="songLeaderboradsTitle">{t("setlistScoreTitle", {type: "Band"})}</div>

        {isLoading ? (<>
            <div className="songLeaderboardsNoScores">{t("setlistScoreLoading")}</div>
        </>) : (<>
            {(leaders && leaders.length) ? (
                <div id="songLeaderboardsList">
                    {leaders.map(lead => (
                        <SongLeadEntry
                            leadData={lead}
                            key={lead.pid}
                        />
                    ))}
                </div>
            ) : (
                <div className="songLeaderboardsNoScores">There are no scores?</div>
            )}
        </>)}

    </div>

    )

}