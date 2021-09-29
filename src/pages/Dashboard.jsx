import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { GET_SPESIFIC_USER, REGISTER_USER } from '@/graphql/gql';
import * as unsullied from 'unsullied';
import { customAlphabet } from 'nanoid';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function Dashboard() {
  const [addUsername] = useMutation(REGISTER_USER);
  const [getSpecificUser, { data: dataUser, error }] =
    useLazyQuery(GET_SPESIFIC_USER);

  const nanoid = customAlphabet('1234567890abcdef', 4);
  const name = unsullied();

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useHistory();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  useEffect(() => {
    getSpecificUser({
      variables: {
        where: {
          email: {
            _eq: user.email,
          },
        },
      },
    });
    if (dataUser?.katalia_user.length === 0) {
      addUsername({
        variables: {
          username: name + nanoid(),
          email: user.email,
        },
      });
    }
  }, [dataUser]);

  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {user?.email}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
