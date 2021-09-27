import React, { useEffect } from 'react';
import { Auth, Typography, Button } from '@supabase/ui';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';

const supabase = createClient(
  'https://mflkltactvvxiatgmjgd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjQ4MzU2MCwiZXhwIjoxOTQ4MDU5NTYwfQ.cv1arp3q5rRe3lecSHCFpABL0xPpVtgbmzA9dDqSrKM'
);

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user) {
    useEffect(() => {
      console.log(
        Math.random().toString(36).substring(2, 10) +
          Math.random().toString(36).substring(2, 10)
      );
    }, []);

    return (
      <section className='p-32'>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </section>
    );
  }
  return props.children;
};

export default function AuthBasic() {
  const { user } = Auth.useUser();

  return (
    <section>
      <Header />
      <section className='items-center justify-center'>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Container supabaseClient={supabase}>
            <Auth
              className='p-16 font-bold flex items-center justify-center'
              supabaseClient={supabase}
            />
          </Container>
        </Auth.UserContextProvider>
      </section>
    </section>
  );
}
