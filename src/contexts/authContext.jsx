import { useState, useEffect, createContext } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext();

const supabase = createClient(
  'https://gydmbpxohlkdljnaqvyz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5ZG1icHhvaGxrZGxqbmFxdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzIyNDQsImV4cCI6MjA1MzU0ODI0NH0.FEHOZot2X2a5vHnYpp8X-QkHbrbrGIdwNdsrChtZ0UQ'
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