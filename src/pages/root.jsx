import { useContext, useRef } from "react"
import { SetlistContext } from "../contexts/setlistContext"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../assets/root.css"
import LanguangeSelect from "../components/languageSelect";
import LoginLinkBtn from "../components/loginLinkBtn";

export default function Root() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { loadUserUploadSetlist } = useContext(SetlistContext);

    const inputFile = useRef();

    async function useDemoSetlist() {
        navigate("/Demo");
    }

    function userFileClick() {
        inputFile.current.click();
    }

    function userFileChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            e.target.files[0].text().then( async (data) => {                
                await loadUserUploadSetlist(data);
                navigate("/LocalUpload");
            })
        }
    }

    return (<>

    <div id="homeSettings">

        <LanguangeSelect />

        <LoginLinkBtn />

    </div>

    <div id="homeCenterWrap">

            <div id="homeTopContent">

                <div id="homeTopTitle">RB Setlist</div>

                <div id="homeTopDesc">{t("homeTopDesc")}</div>

            </div>

            <div id="homeMidBar"></div>

            <div id="homeBotContent">

                <button
                    onClick={useDemoSetlist}
                    id="homeBotDemoBtn"
                >
                    {t("homeViewDemoBtn")}
                </button>

                <button
                    id="homeBotUploadBtn"
                    onClick={userFileClick}
                >
                    {t("homeUploadSetlistBtn")}
                </button>
                <input
                    ref={inputFile}
                    hidden={true}
                    type="file"
                    accept={[".json"]}
                    maxfiles={1}
                    onChange={userFileChange}
                ></input>

            </div>

    </div>

    </>)

}