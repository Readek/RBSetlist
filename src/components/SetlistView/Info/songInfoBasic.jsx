import { useTranslation } from "react-i18next";

export default function SongInfoBasic({value, label}) {

    const { t } = useTranslation();
    
    return (
        <div className="songInfoBasicData">
            <div className="songInfoBasicLabel">{t(`setlistInfoData${label}`)}:</div>
            <div className="songInfoBasicValue">{value}</div>
        </div>
    )

}