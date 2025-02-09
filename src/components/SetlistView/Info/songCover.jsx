import { useContext, useEffect, useState } from "react"
import { fetchCoverSrc } from "../../../data/FetchCover.mjs";
import { ActiveSongContext } from "../../../contexts/activeSongContext";
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

export default function SongCover() {

    /** @type {{activeSong: SetlistData}} */
    const { activeSong } = useContext(ActiveSongContext);

    const [ coverSrc, setCoverSrc ] = useState();

    useEffect( () => {
        
        const coverRes = fetchCoverSrc(
            activeSong.name, activeSong.artist, activeSong.reactId
        );

        coverRes.then((res) => {
            setCoverSrc(res);
        })

    }, [activeSong])
    
    return (<>
    
    <img
        id="songInfoCover"
        src={coverSrc}
        alt="Song Cover"
    />

    </>)

}