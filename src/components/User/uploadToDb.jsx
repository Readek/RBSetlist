import { useContext, useRef, useState } from "react";
import { AuthContext, supabase } from "../../contexts/authContext";
import { SetlistContext } from "../../contexts/setlistContext";
import { useTranslation } from "react-i18next";
import "../../assets/User/uploadToDb.css";

export default function UploadToDb({getItems, setLoadingList}) {

    const { t } = useTranslation();

    const inputFile = useRef();

    const { session } = useContext(AuthContext);
    const { loadUserUploadSetlist } = useContext(SetlistContext);

    const [ nameInput, setNameInput ] = useState("");
    const [ descInput, setDescInput ] = useState("");
    const [ urlInput, setUrlInput ] = useState("");
    const [ setlistFile, setSetlistFile ] = useState();

    const [ submitting, setSubmitting ] = useState(false);

    const [ errorMsg, setErrorMsg ] = useState();

    function userFileClick() {
        inputFile.current.click();
    }

    function userFileChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            e.target.files[0].text().then( async (file) => {
                storeData(file);
            })
        }
    }

    async function storeData(file) {
        setSetlistFile(await loadUserUploadSetlist(file));
    }

    async function submitSetlist() {

        setSubmitting(true);

        const dataJson = JSON.stringify(setlistFile, null, 2);

        const { data, error } = await supabase.storage
            .from('setlists')
            .upload(`${session.user.id}/${urlInput}.json`, dataJson)

        if (error) {
            setErrorMsg(error);
        } else {
            setLoadingList(true);
            setNameInput("");
            setDescInput("");
            setUrlInput("");
            setSetlistFile(null);
            addNewRow(data);
        }

        setSubmitting(false);

    }

    async function addNewRow(uploadData) {
        const { data, error } = await supabase
            .from('setlists')
            .insert({
                url: urlInput,
                name: nameInput,
                description: descInput,
                dataurl: uploadData.path,
                user: session.user.id
            })

        if (error) {
            setErrorMsg(error);
        } else {
            getItems();
        }
    }

    return(

    <div id="userUploadContent">
        
        <div className="userUploadInputDiv">
            <div>{t("userUploadNameInputLabel")}</div>
            <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder={t("userUploadNameInputPlaceholder")}
            />
        </div>
        
        <div className="userUploadInputDiv">
            <div>{t("userUploadDescInputLabel")}</div>
            <input
                type="text"
                value={descInput}
                onChange={e => setDescInput(e.target.value)}
                placeholder={t("userUploadDescInputPlaceholder")}
            />
        </div>

        <div className="userUploadInputDiv">
            <div>{t("userUploadUrlInputLabel")}</div>
            <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder={t("userUploadUrlInputPlaceholder")}
            />
            {urlInput && (
                <div id="userUploadUrlPreview">
                    {`Your url will be: "https://readek.github.io/RBSetlist/#/${urlInput}"`}
                </div>
            )}
            
        </div>
        
        <div id="userUploadBtnContent">

            <button onClick={userFileClick}>
                {setlistFile ? (<>
                    {t("userUploadBtnLoaded")}
                </>) : (<>
                    {t("userUploadBtn")}
                </>)}
            </button>
            <input
                ref={inputFile}
                hidden={true}
                type="file"
                accept={[".json"]}
                maxfiles={1}
                onChange={userFileChange}
            ></input>

            {setlistFile && (
                <div>
                    {t("userUploadSongsLoaded", {songCount: setlistFile.length})}
                </div>
            )}
            
        </div>

        <button onClick={submitSetlist}>
            {submitting ? (<>
                {t("userUploadSubmitting")}
            </>) : (<>
                {t("userUploadSubmit")}
            </>)}
        </button>

        {errorMsg && (
            <div>{errorMsg.message}</div>
        )}

    </div>
    
    )

}