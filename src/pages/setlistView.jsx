import { lazy, Suspense, useContext, useEffect } from "react";
import { SetlistContext } from "../contexts/setlistContext";
import { Navigate, useLoaderData } from "react-router-dom";
import SetlistTopBar from "../components/SetlistView/Top/setlistTopBar";
import LoadingList from "../components/SetlistView/List/loadingList";
import "../assets/SetlistView/setlistView.css"
import SongInfo from "../components/SetlistView/Info/songInfo";
import { ActiveSongProvider } from "../contexts/activeSongContext";
/** @import { SetlistData } from "../data/TypeDefinitions.mjs" */

export async function loader({params}) {
    return params.setlistUrl;
}

export default function SetlistView() {

    const setlistUrl = useLoaderData();

    const SetlistList = lazy(() => import('../components/SetlistView/List/setlistList'));

    /** @type {{setlistData: SetlistData[]}} */
    const { setlistData, loadDemoSetlist, loadUserSetlist } = useContext(SetlistContext);

    useEffect( () => {
        if (setlistUrl == "Demo") {
            loadDemoSetlist();
        } else if (setlistUrl == "LocalUpload") {
            // do nothin
        } else {
            loadUserSetlist(setlistUrl);
        }
    }, [])

    return(<>

    {/* if we got here without a valid setlist, go back */}
    {setlistData === null 
    ?(<Navigate to={"/"} />)
    :(
        <div id="setlistContent">

            {setlistData.length ? (<>

                <SetlistTopBar />

                <div id="setlistSongs">

                    <ActiveSongProvider>

                        {<Suspense fallback={<LoadingList/>}>
                            <SetlistList/>
                        </Suspense>}

                        <SongInfo />

                    </ActiveSongProvider>

                </div>
                

            </>) : (
                <LoadingList />
            )}

        </div>
    )}

    </>)

}