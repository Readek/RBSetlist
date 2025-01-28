import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UploadToDb from "../components/User/uploadToDb";

export default function User() {

    const { t } = useTranslation();
    
    const { session, supabase } = useContext(AuthContext);

    const [ uploadList, setUploadList ] = useState([]);

    async function logOut() {
        await supabase.auth.signOut({ scope: 'local' })
    }

    useEffect( () => {
        getItems();
    }, [])

    async function getItems() {
        const { data, error } = await supabase
            .from('setlists')
            .select()
            .eq('user', session.user.id)

        if (error) {
            
        } else {
            setUploadList(data);
        }
    }
    
    return(<>

    {session && <>

        <div>hola, {session.user.email}</div>

        <UploadToDb setUploadList={setUploadList}></UploadToDb>

        <button onClick={logOut}>Sign Out</button>

        {uploadList.map(setlist => (
            <div key={setlist.name}>{setlist.name}</div>
        ))}

    </>}

    {session === null && <Navigate to={"/"} />}

    </>)

}