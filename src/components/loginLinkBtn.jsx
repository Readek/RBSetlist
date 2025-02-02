import { Link } from "react-router-dom";
import { AuthContext, supabase } from "../contexts/authContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import "../assets/loginLinkBtn.css";

export default function LoginLinkBtn() {

    const { t } = useTranslation();

    const { session } = useContext(AuthContext);
    
    return(<>
    
    {supabase && (

        session ? (
            <Link to={"/Config/User"}>
                <button className="loginLinkBtn" tabIndex={-1}>{t("loginLinkBtnLoged")}</button>
            </Link>
        ) : (
            <Link to={"/Config/Login"}>
                <button className="loginLinkBtn" tabIndex={-1}>{t("loginLinkBtnLogin")}</button>
            </Link>
        )

        
    )}

    </>)
}