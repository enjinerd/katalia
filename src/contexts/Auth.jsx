import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/gql';

const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const [addUsername] = useMutation(REGISTER_USER);

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        const defaultUsername = session.user.email
          .substring(0, session.user.email.lastIndexOf('@'))
          .split('')
          .filter((d) => d !== '_' || d !== '.')
          .join('');
        console.log(defaultUsername);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
