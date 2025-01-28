import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/authContext";
import { SetlistContext } from "../../contexts/setlistContext";
import { useTranslation } from "react-i18next";

export default function UploadToDb({setUploadList}) {

    const { t } = useTranslation();

    const inputFile = useRef();

    const { session, supabase } = useContext(AuthContext);
    const { setlistData, loadUserUploadSetlist } = useContext(SetlistContext);

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

        await loadUserUploadSetlist(file);

        const dataJson = JSON.stringify(setlistData, null, 2);

        const { data, error } = await supabase.storage
            .from('setlists')
            .upload(session.user.id + '/testo.json', dataJson)

        if (error) {
            console.log(error);
        } else {
            addNewRow(data);
        }

    }

    async function addNewRow(uploadData) {
        const { data, error } = await supabase
            .from('setlists')
            .insert({
                url: "testo",
                name: 'My Awesome Setlist',
                description: "idk man",
                dataurl: uploadData.path,
                user: session.user.id
            })
            .select()
            .eq('user', session.user.id)

        if (error) {
            console.log(error);
        } else {
            setUploadList(data);
        }
    }
    
    return(<>

    <button onClick={userFileClick}>
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

    </>)

}