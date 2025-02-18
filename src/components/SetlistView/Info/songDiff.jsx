import "../../../assets/SetlistView/Info/songDiff.css"
import SongDiffIcon from "./songDiffIcon"
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

/** @param {{songData: SetlistData}} */
export default function SongDiff({songData}) {
    
    return(

    <div id="songDiffDiv">

        <SongDiffIcon
            diffNum={songData.guitar_diff}
            diffNumPro={songData.proguitar_diff}
            instrument={"Guitar"}
        />

        <SongDiffIcon
            diffNum={songData.bass_diff}
            diffNumPro={songData.probass_diff}
            instrument={"Bass"}
        />

        <SongDiffIcon
            diffNum={songData.drums_diff}
            instrument={"Drums"}
        />


        <SongDiffIcon
            diffNum={songData.keys_diff}
            diffNumPro={songData.prokeys_diff}
            instrument={"Keys"}
        />

        <SongDiffIcon
            diffNum={songData.vocal_diff}
            diffNumPro={songData.vocal_parts}
            instrument={"Vocals"}
        />

    </div>

    )

}