import { useContext, useEffect, useState } from "react"
import { ActiveSongContext } from "../../../contexts/activeSongContext";
import { fetchLeaderboards } from "../../../data/FetchLeaderboards.mjs";
import SongLeadEntry from "./songLeadEntry";
import "../../../assets/SetlistView/Info/songLeaderboards.css"
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

export default function SongLeaderborards() {
       
    /** @type {{activeSong: SetlistData}} */
    const { activeSong } = useContext(ActiveSongContext);

    const [ leaders, setLeaders ] = useState([]);
    
    useEffect( () => {
        
        const leadsRes = fetchLeaderboards(activeSong.songid, 0);

        leadsRes.then((res) => {
            setLeaders(res);
        })

    }, [activeSong])
  
    return(

    <div id="songLeaderboardsContent">

        <div id="songLeaderboradsTitle">Band Leaderborads</div>

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
            <div>There are no scores?</div>
        )}
        

    </div>

    )

}