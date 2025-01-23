import { useContext, useEffect } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate } from "react-router-dom";
import SetlistTopBar from "../components/SetlistView/Top/setlistTopBar";
import SetlistList from "../components/SetlistView/List/setlistList";
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

export default function SetlistView() {

    /** @type {{setlistActive: SetlistActive, setlistInfo: SetlistInfo}} */
    const { setlistData } = useContext(SetlistContext);

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData.length == 0 && (<Navigate to={"/"} />)}

    <div id="setlistContent">

        <SetlistTopBar />

        <SetlistList />

    </div>

    </>)

}