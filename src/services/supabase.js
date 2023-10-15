import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vjgurmafyszybefogirp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ3VybWFmeXN6eWJlZm9naXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MDQ1MjQsImV4cCI6MjAxMTk4MDUyNH0.XbBi8IeTWupFFvnpOy1m3qD9LKWPbZuVlAQfxXSHg98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
