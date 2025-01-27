import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function User() {

    const { session, supabase } = useContext(AuthContext);

    async function logOut() {
        
        await supabase.auth.signOut({ scope: 'local' })

    }
    
    return(<>

    {session && <>

        <div>hola, {session.user.email}</div>

        <button onClick={logOut}>Sign Out</button>
    
    </>}

    {session === null && <Navigate to={"/"} />}

    </>)

}