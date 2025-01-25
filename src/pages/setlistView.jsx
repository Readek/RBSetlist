import { lazy, Suspense, useContext } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate } from "react-router-dom";
import SetlistTopBar from "../components/SetlistView/Top/setlistTopBar";
import LoadingList from "../components/SetlistView/List/loadingList";
import "../assets/SetlistView/setlistView.css"
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

export default function SetlistView() {

    /** @type {{setlistData: SetlistData[]}} */
    const { setlistData } = useContext(SetlistContext);

    const SetlistList = lazy(() => import('../components/SetlistView/List/setlistList'));

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData.length == 0 && (<Navigate to={"/"} />)}

    <div id="setlistContent">

        <SetlistTopBar />

        {<Suspense fallback={<LoadingList/>}>
            <SetlistList/>
        </Suspense>}

    </div>

    </>)

}