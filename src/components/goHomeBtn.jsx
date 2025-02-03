import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function GoHomeBtn() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    function goHome() {
        navigate("/");
    }

    return(
        <button onClick={goHome}>{t("btnGoHome")}</button>
    )

}