import { useContext, useRef } from "react"
import { SetlistContext } from "../contexts/setlistContext"
import { useTranslation } from "react-i18next";
import Settings from "../components/settings";
import { Link, useNavigate } from "react-router-dom";

export default function Root() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { loadUserUploadSetlist, loadDemoSetlist } = useContext(SetlistContext);
    const inputFile = useRef();

    async function useDemoSetlist() {
        await loadDemoSetlist();
        navigate("/setlist");
    }

    function userFileClick() {
        inputFile.current.click();
    }

    function userFileChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            e.target.files[0].text().then( async (data) => {                
                await loadUserUploadSetlist(data);
                navigate("/setlist");
            })
        }
    }

    return (<>

    <Settings></Settings>

    <Link to={"/Config/Login"}>
        <button>Login</button>
    </Link>

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

    </>)

}