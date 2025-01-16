import { useContext, useRef } from "react"
import { SetlistContext } from "../contexts/setlistContext"

export default function Root() {

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
    
    <h1>RB Setlist</h1>

    <button onClick={userFileClick}>Upload Setlist</button>
    <input
        ref={inputFile}
        hidden={true}
        type="file"
        accept={[".json"]}
        maxfiles={1}
        onChange={userFileChange}
    ></input>
    
    <button onClick={useDemoSetlist}>View Demo Setlist</button>

    <div>
        {setlistData.setlist.length} songs
        {setlistData.setlist.map(song => (
            <div key={song.songid+song.shortname}>{song.artist} - {song.name}</div>
        ))}
    </div>
    
    </>)

}