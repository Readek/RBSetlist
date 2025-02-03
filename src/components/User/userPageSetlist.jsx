import { useContext } from "react";
import { AuthContext, supabase } from "../../contexts/authContext";
import "../../assets/User/userPageSetlist.css";
import { useTranslation } from "react-i18next";

export default function UserPageSetlist({dbData, getItems, setLoadingList}) {

    const { t } = useTranslation();

    const { session } = useContext(AuthContext);

    async function deleteSetlist() {

        setLoadingList(true);
        
        const response = await supabase
            .from('setlists')
            .delete()
            .eq('url', dbData.url);

        if (response.error) console.log(response.error);

        await supabase.storage
            .from('setlists')
            .remove([`${session.user.id}/${dbData.url}.json`]);

        getItems();

    }
    
    return(

        <div className="userSetlist">

            <div className="userSetlistCombo">
                <div className="userSetlistKey">{t("userSetlistName")}</div>
                <div className="userSetlistValue">{dbData.name}</div>
            </div>

            <div className="userSetlistCombo">
                <div className="userSetlistKey">{t("userSetlistDescription")}</div>
                <div className="userSetlistValue">{dbData.description}</div>
            </div>

            <div className="userSetlistCombo">
                <div className="userSetlistKey">{t("userSetlistUrl")}</div>
                <div className="userSetlistValue">{dbData.url}</div>
            </div>

            <button onClick={deleteSetlist}>{t("userSetlistDelete")}</button>

        </div>

    )

}