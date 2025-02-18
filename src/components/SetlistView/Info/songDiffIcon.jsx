import { useEffect, useState } from "react"
import "../../../assets/SetlistView/Info/songDiffIcon.css"

export default function SongDiffIcon({diffNum, diffNumPro, instrument}) {

    const [ missInst, setMissInst ] = useState("");
    const [ proInst, setProInst ] = useState("");

    useEffect( () => {

        // darken icon if no part
        if (!diffNum) {
            setMissInst("songDiffIconMiss");
        } else {
            setMissInst("");
        }

        if (diffNumPro && instrument != "Vocals") {
            setProInst("Pro");
        } else {
            setProInst("");
        }

        if (instrument == "Vocals") {
            // diffNumPro = vocal parts
            if (diffNumPro > 1) {
                setProInst(diffNumPro);
            } else {
                setProInst("");
            }
        }

    }, [diffNum, diffNumPro]);

    return(
        <div className="songDiffIconDiv">
            <img 
                className="songDiffIcon songDiffIconBorder"
                src={"Diffs/"+diffNum+".png"}
                alt={`${instrument} difficulty ${diffNum}`}
            />
            <img 
                className={`songDiffIcon songDiffIconBase ${missInst}`}
                src={`InstrumentIcons/${instrument}${proInst}.png`}
                alt={`${instrument} icon`}
            />
        </div>
    )

}