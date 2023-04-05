import { createClient } from '@supabase/supabase-js'
const URL = 'https://gfeqjmsrfmuazabsxsyn.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZXFqbXNyZm11YXphYnN4c3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTYyNzAsImV4cCI6MTk5NjIzMjI3MH0.zETYYtLVr1oyMviSMmaK8wLKGZqbxol0IAJtMlhgJn0';

export const supabase = createClient(URL, API_KEY);
