import { useTranslation } from "react-i18next";
import "../../../assets/SetlistView/Info/songLeadEntry.css";

export default function SongLeadEntry({leadData}) {

    const { t } = useTranslation();

    return(

    <div className="songLeadEntry">

        <div className="songLeadLeft">
            <div className="songLeadRank">#{leadData.rank}</div>
            <div className="songLeadName">{leadData.name}</div>
        </div>

        <div className="songLeadRight">
            <div className="songLeadScore">{leadData.score.toLocaleString()}</div>
            <div className="songLeadRightBot">
                <div>{t("setlistScoreDiff"+leadData.diff_id)}</div>
                <div>{leadData.notes_pct}%</div>
            </div>
        </div>

    </div>

    )

}