import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';
import "../assets/login.css"

export default function Login() {

    const { session, supabase } = useContext(AuthContext);

    if (!session) {
        return (
            <div id='loginContainer'>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                    }}
                    providers={[]}
                    theme='dark'
                />
            </div>
        )
    } else {
        return (<>
            <Navigate to={"/Config/User"} replace={true} />
        </>)
    }

}