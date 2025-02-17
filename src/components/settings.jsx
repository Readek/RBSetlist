import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { supabase } from "../contexts/authContext";

const languageList = [
    "en", "es"
];

export default function Settings() {

    const { i18n, t } = useTranslation();

    function changeLang(e) {
        i18n.changeLanguage(e.target.value);
    }

    return(<>
    
    <select
        defaultValue={i18n.language}
        onChange={changeLang}
    >
        {languageList.map((langCode) => (
            <option key={langCode} value={langCode}>
                {t("langSelect"+langCode)}
            </option>
        ))}
    </select>

    {supabase && (
        <Link to={"/Config/Login"}>
            <button>Login</button>
        </Link>
    )}

    </>)

}