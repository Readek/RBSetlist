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
    const [ inst, setInst ] = useState(10);

    useEffect( () => {

        setIsLoading(true);

        const leadsRes = fetchLeaderboards(activeSong.songid, inst);

        leadsRes.then((res) => {
            setLeaders(res);
            setIsLoading(false);
        })

    }, [activeSong, inst])

    useEffect( () => {
        setInst(10);
    }, [activeSong])
  
    return(

    <div id="songLeaderboardsContent">

        <div id="songLeaderboardsTitleDiv">
        <select
            id="songLeaderboardsSelect"
            value={inst}
            onChange={e => setInst(e.target.value)}
        >
            <option value="10">{t("setlistScoreTitle", {type: t("instBand")})}</option>
            <option value="2">{t("setlistScoreTitle", {type: t("instGuitar")})}</option>
            <option value="7">{t("setlistScoreTitle", {type: t("instGuitarPro")})}</option>
            <option value="1">{t("setlistScoreTitle", {type: t("instBass")})}</option>
            <option value="8">{t("setlistScoreTitle", {type: t("instBassPro")})}</option>
            <option value="0">{t("setlistScoreTitle", {type: t("instDrums")})}</option>
            <option value="6">{t("setlistScoreTitle", {type: t("instDrumsPro")})}</option>
            <option value="5">{t("setlistScoreTitle", {type: t("instKeys")})}</option>
            <option value="9">{t("setlistScoreTitle", {type: t("instKeysPro")})}</option>
            <option value="3">{t("setlistScoreTitle", {type: t("instVocals")})}</option>
            <option value="4">{t("setlistScoreTitle", {type: t("instHarm")})}</option>
        </select>
        </div>

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
                <div className="songLeaderboardsNoScores">{t("setlistScoreNone")}</div>
            )}
        </>)}

    </div>

    )

}