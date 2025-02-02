import { useContext, useEffect, useState } from "react";
import { AuthContext, supabase } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UploadToDb from "../components/User/uploadToDb";
import UserPageSetlist from "../components/User/userPageSetlist";
import LanguangeSelect from "../components/languageSelect";

export default function User() {

    const { t } = useTranslation();

    const { session } = useContext(AuthContext);

    const [ uploadList, setUploadList ] = useState([]);

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
    }

    return(<>

    {session && <>

        <div id="homeSettings">
            <LanguangeSelect />
        </div>

        <div>hola, {session.user.email}</div>

        <h3>Upload a setlist</h3>

        <UploadToDb getItems={getItems}></UploadToDb>

        <h3>Your setlists</h3>

        {uploadList.map(setlist => (
            <UserPageSetlist 
                dbData={setlist}
                getItems={getItems}
                key={setlist.name}
            />
        ))}

        <button onClick={logOut}>Sign Out</button>

    </>}

    {session === null && <Navigate to={"/"} />}

    </>)

}