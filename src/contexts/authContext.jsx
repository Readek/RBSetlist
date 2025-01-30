import { useState, useEffect, createContext } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext();

// if env keys not found, keep things rolling with "123"
export const supabase = createClient(
  'https://'+import.meta.env.VITE_SUPABASE_PROJECT_ID+'.supabase.co' || "123",
  import.meta.env.VITE_SUPABASE_API_KEY || "123"
);

function AuthProvider({ children }) {

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  
      return () => subscription.unsubscribe()
    }
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