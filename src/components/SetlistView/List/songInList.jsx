import { useState } from "react";
import "../../../assets/SetlistView/List/songInList.css";
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

/** @param {{songData: SetlistData, sortType: String}} */
export default function SongInList({songData, sortType}) {

    const [sourceImg, setSourceImg] = useState(
        // we remove underscores because there can be differences
        // in source names depending on how you export things
        "SourceIcons/"+songData.source.replace("_", "")+".png"
    )

    return(

    <div className="setlistListSong">

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

        {sortType == "Artist"
        ?
            <span className="setlistListSongSecon">
                {songData.duration}
            </span>
        :
            <div className="setlistListSongSecon">
                {songData.artist}
            </div>
        }

    </div>
    
    </div>

    )

}