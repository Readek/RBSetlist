import { useContext, useEffect, useState } from "react";
import { AuthContext, supabase } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UploadToDb from "../components/User/uploadToDb";
import UserPageSetlist from "../components/User/userPageSetlist";
import LanguangeSelect from "../components/languageSelect";
import "../assets/User/user.css";
import GoHomeBtn from "../components/goHomeBtn";

export default function User() {

    const { t } = useTranslation();

    const { session } = useContext(AuthContext);

    const [ uploadList, setUploadList ] = useState([]);

    const [ loadingList, setLoadingList ] = useState(true);

    async function logOut() {
        await supabase.auth.signOut({ scope: 'local' })
    }

    useEffect( () => {
        if (session) getItems();
    }, [session])

    async function getItems() {
        const { data, error } = await supabase
            .from('setlists')
            .select()
            .eq('user', session.user.id)
        if (error) {
            console.log(error);
        } else {
            setUploadList(data);
        }
        setLoadingList(false);
    }

    return(<>

    {session && <>

        <div id="userContent">

            <div id="userLanguageSel">
                <LanguangeSelect />
            </div>

            <div id="userSetlistsContent">

                <h1>{t("userYourSetlists")}</h1>

                <div id="userSetlists">

                    {loadingList ? (
                        <div id="userSetlistsLoading">
                            {t("userSetlistsLoading")}
                        </div>
                    ) : (<>
                        {uploadList.length ? (<>
                            {uploadList.map(setlist => (
                                <UserPageSetlist 
                                    dbData={setlist}
                                    getItems={getItems}
                                    setLoadingList={setLoadingList}
                                    key={setlist.name}
                                />
                            ))}
                        </>) : (<>
                            <div id="userSetlistsNone">
                                {t("userSetlistsNone")}
                            </div>
                        </>)}
                    </>)}

                </div>

            </div>

            <div id="userUploadSetlistContent">

                <h1>{t("userUploadSetlist")}</h1>

                <UploadToDb
                    getItems={getItems}
                    setLoadingList={setLoadingList}
                />

            </div>

        </div>

        <div id="userLogOut">

            <div>{t("userLoggedAs", {userName: session.user.email})}</div>
            <div id="userLogOutBtns">
                <button onClick={logOut}>{t("userLogOut")}</button>
                <GoHomeBtn/>
            </div>
            

        </div>

    </>}

    {session === null && <Navigate to={"/"} />}

    </>)

}