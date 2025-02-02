import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext } from 'react';
import { AuthContext, supabase } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';
import "../assets/login.css"
import { useTranslation } from 'react-i18next';
import LanguangeSelect from '../components/languageSelect';

export default function Login() {

  const { t } = useTranslation();

  const { session } = useContext(AuthContext);

  if (!session) {
    return (<>

      <div id="homeSettings">
        <LanguangeSelect />
      </div>
      
      <div id='loginContainer'>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={[]}
          theme='dark'
          localization={{
            variables: {
              sign_up: {
                email_label: t("loginEmailLabel"),
                email_input_placeholder: t("loginEmailPlaceholder"),
                password_label: t("loginPasswordLabel"),
                password_input_placeholder: t("loginPasswordPlaceholder"),
                button_label: t("signUpButtonLabel"),
                loading_button_label: t("signUpButtonLoading"),
                link_text: t("signUpLink"),
                confirmation_text: t("signUpConfirmation"),
              },
              sign_in: {
                email_label: t("loginEmailLabel"),
                email_input_placeholder: t("loginEmailPlaceholder"),
                password_label: t("loginPasswordLabel"),
                password_input_placeholder: t("loginPasswordPlaceholder"),
                button_label: t("signInButtonLabel"),
                loading_button_label: t("signInButtonLoading"),
                link_text: t("signInLink"),
              },
              forgotten_password: {
                email_label: t("loginEmailLabel"),
                email_input_placeholder: t("loginEmailPlaceholder"),
                button_label: t("forgotButtonLabel"),
                loading_button_label: t("signInButtonLoading"),
                link_text: t("forgotLink"),
              }
            },
          }}
        />
      </div>
    </>)
  } else {
    return (
      <Navigate to={"/Config/User"} replace={true} />
    )
  }

}