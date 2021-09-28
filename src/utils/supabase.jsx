import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_GRAPHQL_SERVER,
  import.meta.env.VITE_GRAPHQL_SECRET
);

export { supabase };
