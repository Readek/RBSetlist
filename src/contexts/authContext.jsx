import { useState, useEffect, createContext } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext();

const supabase = createClient(
  'https://'+import.meta.env.VITE_SUPABASE_PROJECT_ID+'.supabase.co',
  import.meta.env.VITE_SUPABASE_API_KEY
)

function AuthProvider({ children }) {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return(
    <AuthContext.Provider  value={{
      session: session, setSession: setSession,
      supabase: supabase
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export { AuthContext, AuthProvider };