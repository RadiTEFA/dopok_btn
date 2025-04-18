import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = 'https://mkaztocjgscmmocufetb.supabase.co'; // Ganti dengan Project URL Anda
   const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYXp0b2NqZ3NjbW1vY3VmZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDA1MzMsImV4cCI6MjA2MDUxNjUzM30.N8Ze913UMZQlr8ky3T7MqzkQTZYo7JcKwamHUw7MHuM'; // Ganti dengan Anon Key Anda
   export const supabase = createClient(supabaseUrl, supabaseKey);