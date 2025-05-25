import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    // SQL für die Erstellung der Tabellen und Funktionen
    const sql = `
    -- Erstelle profiles Tabelle
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
      username TEXT UNIQUE,
      full_name TEXT,
      avatar_url TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Erstelle stages Tabelle
    CREATE TABLE IF NOT EXISTS stages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    );

    -- Erstelle acts Tabelle
    CREATE TABLE IF NOT EXISTS acts (
      id SERIAL PRIMARY KEY,
      stage_id INTEGER REFERENCES stages(id) ON DELETE CASCADE,
      artist TEXT NOT NULL,
      day TEXT NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL
    );

    -- Erstelle user_favorites Tabelle
    CREATE TABLE IF NOT EXISTS user_favorites (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      act_id INTEGER REFERENCES acts(id) ON DELETE CASCADE,
      UNIQUE(user_id, act_id)
    );

    -- Erstelle user_locations Tabelle
    CREATE TABLE IF NOT EXISTS user_locations (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      stage_id INTEGER REFERENCES stages(id) ON DELETE CASCADE,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Erstelle RLS-Policies
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_locations ENABLE ROW LEVEL SECURITY;

    -- Profiles Policies
    CREATE POLICY IF NOT EXISTS "Öffentliche Profile sind für alle sichtbar" 
    ON profiles FOR SELECT USING (true);

    CREATE POLICY IF NOT EXISTS "Benutzer können nur ihr eigenes Profil aktualisieren" 
    ON profiles FOR UPDATE USING (auth.uid() = id);

    -- Favorites Policies
    CREATE POLICY IF NOT EXISTS "Benutzer können ihre eigenen Favoriten sehen" 
    ON user_favorites FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY IF NOT EXISTS "Benutzer können ihre eigenen Favoriten erstellen" 
    ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

    CREATE POLICY IF NOT EXISTS "Benutzer können ihre eigenen Favoriten löschen" 
    ON user_favorites FOR DELETE USING (auth.uid() = user_id);

    -- Locations Policies
    CREATE POLICY IF NOT EXISTS "Standorte sind für alle sichtbar" 
    ON user_locations FOR SELECT USING (true);

    CREATE POLICY IF NOT EXISTS "Benutzer können nur ihren eigenen Standort aktualisieren" 
    ON user_locations FOR INSERT WITH CHECK (auth.uid() = user_id);

    CREATE POLICY IF NOT EXISTS "Benutzer können nur ihren eigenen Standort löschen" 
    ON user_locations FOR DELETE USING (auth.uid() = user_id);

    -- Erstelle Funktion für Supabase Auth Hooks
    CREATE OR REPLACE FUNCTION public.handle_new_user() 
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.profiles (id, username, full_name, avatar_url)
      VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Trigger für neue Benutzer
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    `

    // Führe das SQL aus
    const { error } = await supabase.rpc("exec_sql", { sql })

    if (error) {
      console.error("Fehler beim Ausführen des SQL:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Fehler beim Einrichten der Datenbank:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
