import { useContext, useRef } from "react"
import { SetlistContext } from "../contexts/setlistContext"
import { useTranslation } from "react-i18next";
import Settings from "../components/settings";

export default function Root() {

    const { t } = useTranslation();

    const { setlistData, loadUserUploadSetlist, loadDemoSetlist } = useContext(SetlistContext);
    const inputFile = useRef();

    function useDemoSetlist() {
        loadDemoSetlist();
    }

    function userFileClick() {
        inputFile.current.click();
    }

    function userFileChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            e.target.files[0].text().then( (data) => {                
                loadUserUploadSetlist(data)
            })
        }
    }

    return (<>

    <Settings></Settings>

    <h1>RB Setlist</h1>

    <button onClick={userFileClick}>{t("homeUploadSetlistBtn")}</button>
    <input
        ref={inputFile}
        hidden={true}
        type="file"
        accept={[".json"]}
        maxfiles={1}
        onChange={userFileChange}
    ></input>
    
    <button onClick={useDemoSetlist}>{t("homeViewDemoBtn")}</button>

    <div>
        {t("homeSongCount", {songCount: setlistData.setlist.length})}
        {setlistData.setlist.map(song => (
            <div key={song.songid+song.shortname}>{song.artist} - {song.name}</div>
        ))}
    </div>

    </>)

}