import { useEffect, useState } from "react"
import "../../../assets/SetlistView/List/listInstrumentIcons.css"
/** @import { SetlistData } from "../../../data/TypeDefinitions.mjs" */

const missClass = "setlistListInstrumentIconMiss"

/** @param {{songData: SetlistData}} */
export default function ListInstrumentIcons({songData}) {

    const [ proGuitar, setProGuitar ] = useState("");
    const [ proBass, setProBass ] = useState("");
    const [ proKeys, setProKeys ] = useState("");
    const [ vocals, setVocals ] = useState("");

    const [ missGuitar, setMissGuitar ] = useState("");
    const [ missBass, setMissBass ] = useState("");
    const [ missDrums, setMissDrums ] = useState("");
    const [ missKeys, setMissKeys ] = useState("");
    const [ missVocals, setMissVocals ] = useState("");

    useEffect( () => {  
                
        if (songData.proguitar_diff) {
            setProGuitar("Pro");
        } else if (!songData.guitar_diff) {
            setMissGuitar(missClass);
        }

        if (songData.probass_diff) {
            setProBass("Pro");
        } else if (!songData.bass_diff) {
            setMissBass(missClass);
        }

        if (!songData.drums_diff) {
            setMissDrums(missClass);
        }

        if (songData.prokeys_diff) {
            setProKeys("Pro");
        } else if (!songData.keys_diff) {
            setMissKeys(missClass);
        }

        if (songData.vocal_parts > 1) {
            setVocals(songData.vocal_parts);
        } else if (!songData.vocal_diff) {
            setMissVocals(missClass);
        }

    }, []);

    return(

    <div className="setlistListInstruments">

        <img
            src={"InstrumentIcons/Guitar"+proGuitar+".png"}
            className={"setlistListInstrumentIcon "+missGuitar}
            alt="Guitar Icon"
        />

        <img
            src={"InstrumentIcons/Bass"+proBass+".png"}
            className={"setlistListInstrumentIcon "+missBass}
            alt="Bass Icon"
        />

        <img
            src={"InstrumentIcons/Drums.png"}
            className={"setlistListInstrumentIcon "+missDrums}
            alt="Drums Icon"
        />

        <img
            src={"InstrumentIcons/Keys"+proKeys+".png"}
            className={"setlistListInstrumentIcon "+missKeys}
            alt="Keys Icon"
        />

        <img
            src={"InstrumentIcons/Vocals"+vocals+".png"}
            className={"setlistListInstrumentIcon "+missVocals}
            alt="Vocals Icon"
        />

    </div>

    )

}