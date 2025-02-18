import { useContext, useEffect, useState } from "react";
import "../../../assets/SetlistView/Info/songInfo.css";
import { ActiveSongContext } from "../../../contexts/activeSongContext";
import { useTranslation } from "react-i18next";
import SongCover from "./songCover";
import SongInfoBasic from "./songInfoBasic";
import SongLeaderborards from "./songLeaderboards";
import SongDiff from "./songDiff";
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs*/

export default function SongInfo() {

    const { t } = useTranslation();

    /** @type {{activeSong: SetlistData}} */
    const { activeSong } = useContext(ActiveSongContext);

    const [sourceImg, setSourceImg] = useState("");

    useEffect( () => {

        if (activeSong) {
            // we remove underscores because there can be differences
            // in source names depending on how you export things
            setSourceImg(`SourceIcons/${activeSong.source.replace("_", "")}.png`);
        }

    }, [activeSong])

    return (

    <div id="songInfoContent">

    {activeSong && (<>

        <SongCover/>

        <div id="songInfoNameArtist">
            <div id="songInfoSongName">{activeSong.name}</div>
            <div id="songInfoArtist">{activeSong.artist}</div>
            <SongDiff songData={activeSong}/>
        </div>

        <div id="songInfoBasicList">

            {activeSong.album && (
                <div className="songInfoBasicData">
                    <div className="songInfoBasicLabel">{t("setlistInfoDataAlbum")}:</div>
                    <div className="songInfoBasicValue">{activeSong.album}</div>
                    {activeSong.track_number && (
                        <div className="songInfoBasicSecon">#{activeSong.track_number}</div>
                    )}
                </div>
            )}

            <SongInfoBasic label={"Genre"} value={activeSong.genre} />

            <SongInfoBasic label={"Year"} value={activeSong.year_released} />

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataSource")}:</div>
                <img
                    src={sourceImg}
                    onError={() => {
                        setSourceImg("SourceIcons/generic.png");
                    }}
                    alt={activeSong.source}
                    title={activeSong.source}
                />
                <div className="songInfoBasicSecon">{activeSong.source}</div>
            </div>

            <SongInfoBasic label={"Shortname"} value={activeSong.shortname} />

            <SongInfoBasic label={"Id"} value={activeSong.songid} />

        </div>

        <SongLeaderborards />

    </>)}

    </div>

    )

}