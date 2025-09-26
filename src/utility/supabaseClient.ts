import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://fsvxiullilfgkmdixshg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdnhpdWxsaWxmZ2ttZGl4c2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTIyOTAsImV4cCI6MjA3NDQyODI5MH0.mZbSLfCFBTSfGQi9ADmwczFP1onXNHCeKnLTlOaB9DE";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
