import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/Auth';

export default function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useHistory();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {user?.email}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
