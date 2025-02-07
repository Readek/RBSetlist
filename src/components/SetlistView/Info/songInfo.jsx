import { useContext, useEffect, useState } from "react";
import "../../../assets/SetlistView/Info/songInfo.css";
import { ActiveSongContext } from "../../../contexts/activeSongContext";
import { useTranslation } from "react-i18next";
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

        <div id="songInfoNameArtist">
            <div id="songInfoSongName">{activeSong.name}</div>
            <div id="songInfoArtist">{activeSong.artist}</div>
        </div>
        
        <div id="songInfoBasicList">

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataAlbum")}:</div>
                <div className="songInfoBasicValue">{activeSong.album}</div>
                <div className="songInfoBasicSecon">#{activeSong.track_number}</div>
            </div>

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataGenre")}:</div>
                <div className="songInfoBasicValue">{activeSong.genre}</div>
            </div>

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataYear")}:</div>
                <div className="songInfoBasicValue">{activeSong.year_released}</div>
            </div>

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

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataShortname")}:</div>
                <div className="songInfoBasicValue">{activeSong.shortname}</div>
            </div>

            <div className="songInfoBasicData">
                <div className="songInfoBasicLabel">{t("setlistInfoDataId")}:</div>
                <div className="songInfoBasicValue">{activeSong.songid}</div>
            </div>

        </div>
        
    </>)}

    </div>

    )
    
}