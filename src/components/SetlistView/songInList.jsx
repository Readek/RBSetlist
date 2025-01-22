import "../../assets/songInList.css";
/** @import { SetlistData, SetlistInfo } from "../../data/TypeDefinitions.mjs" */

/** @param {{songData: SetlistData, sortType: String}} */
export default function SongInList({songData, sortType}) {

    return(

    <div className="setlistListSong">

    <img
        className="setlistListSongIcon"
        src={"SourceIcons/"+songData.source+".png"}
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