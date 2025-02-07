import { useContext } from "react";
import { SetlistContext } from "../../../contexts/setlistContext";
import SongInList from "./songInList";
import SetlistCategoryTitle from "./setlistCategoryTitle";
import "../../../assets/SetlistView/List/setlistList.css"
import { ActiveSongContext } from "../../../contexts/activeSongContext";
/** @import { SetlistActive, SetlistInfo } from "../../../data/TypeDefinitions.mjs*/

export default function SetlistList() {

    /** @type {{setlistActive: SetlistActive[], setlistInfo: SetlistInfo}} */
    const { setlistActive, setlistInfo} = useContext(SetlistContext);

    const { setActiveSong } = useContext(ActiveSongContext);

    return(

    <div id="setlistList">

        {setlistActive.map(category => (

            <div className="setlistListCategory" key={category.name}>

                <SetlistCategoryTitle
                    name={category.name}
                    count={category.songs.length}
                />

                <div className="setlistListCategorySongs">
                    {category.songs.map(song => (
                        <SongInList
                            songData={song}
                            sortType={setlistInfo.sortType}
                            textFilter={setlistInfo.textFilter}
                            setActiveSong={setActiveSong}
                            key={song.reactId}
                        />
                    ))}
                </div>

            </div>

        ))}

    </div>

    )

}