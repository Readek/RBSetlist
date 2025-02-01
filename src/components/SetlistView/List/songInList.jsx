import { useState } from "react";
import "../../../assets/SetlistView/List/songInList.css";
import ListInstrumentIcons from "./listIntrumentIcons";
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

/** @param {{songData: SetlistData, sortType: String, textFilter: String}} */
export default function SongInList({songData, sortType, textFilter}) {

    const [sourceImg, setSourceImg] = useState(
        // we remove underscores because there can be differences
        // in source names depending on how you export things
        "SourceIcons/"+songData.source.replace("_", "")+".png"
    )

    let subtext;
    if (textFilter) { // if theres any text filter, show all

        subtext = (<>
            <div className="setlistListSongSecon">
                {songData.artist}
            </div>
            <div className="setlistListSongSecon">
                {songData.album}
            </div>
        </>)

    } else if (sortType == "Artist") {

        subtext = (
        <div className="setlistListSongSecon">
            {songData.album}
        </div>)

    } else {

        subtext = (<div className="setlistListSongSecon">
            {songData.artist}
        </div>)

    }

    return(

    <div className="setlistListSong">

        <div className="setlistListSongLeft">

            <img
                className="setlistListSongIcon"
                src={sourceImg}
                onError={() => {
                    setSourceImg("SourceIcons/generic.png");
                }}
                alt={songData.source}
                title={songData.source}
            />

            <div className="setlistListTexts">

                <span className="setlistListSongMain">
                    {songData.name}
                </span>

                {subtext}

            </div>

        </div>

        <ListInstrumentIcons songData={songData} />
    
    </div>

    )

}