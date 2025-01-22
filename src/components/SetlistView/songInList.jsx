import "../../assets/songInList.css";
/** @import { SetlistData, SetlistInfo } from "../../data/TypeDefinitions.mjs" */

/** @param {{songData: SetlistData, sortType: String}} */
export default function SongInList({songData, sortType}) {

    return(

    <div className="setlistListSong">

    {sortType == "Artist"
    ?
    <div className="setlistListTexts">
        <span className="setlistListSongMain">
            {songData.name}
        </span>
        <span className="setlistListSongSecon">
            {songData.duration}
        </span>
    </div>
    :
    <div className="setlistListTexts">
        <div className="setlistListSongMain">
            {songData.name}
        </div>
        <div className="setlistListSongSecon">
            {songData.artist}
        </div>
    </div>
    }
    
    </div>

    )

}