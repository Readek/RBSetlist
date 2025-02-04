import { useTranslation } from "react-i18next";
import "../../../assets/SetlistView/List/setlistListLoading.css"

export default function LoadingList() {

    const { t } = useTranslation();
    
    return(
        
    <div id="setlistListLoading">
        <div id="setlistListLoadingText">{t("setlistLoadingText")}</div>
    </div>

    )

}