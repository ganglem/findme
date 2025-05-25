export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      stages: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
      acts: {
        Row: {
          id: number
          stage_id: number
          artist: string
          day: string
          start_time: string
          end_time: string
        }
        Insert: {
          id?: number
          stage_id: number
          artist: string
          day: string
          start_time: string
          end_time: string
        }
        Update: {
          id?: number
          stage_id?: number
          artist?: string
          day?: string
          start_time?: string
          end_time?: string
        }
      }
      user_favorites: {
        Row: {
          id: number
          user_id: string
          act_id: number
        }
        Insert: {
          id?: number
          user_id: string
          act_id: number
        }
        Update: {
          id?: number
          user_id?: string
          act_id?: number
        }
      }
      user_locations: {
        Row: {
          id: number
          user_id: string
          stage_id: number
          timestamp: string
        }
        Insert: {
          id?: number
          user_id: string
          stage_id: number
          timestamp?: string
        }
        Update: {
          id?: number
          user_id?: string
          stage_id?: number
          timestamp?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Stage = Database["public"]["Tables"]["stages"]["Row"]
export type Act = Database["public"]["Tables"]["acts"]["Row"]
export type UserFavorite = Database["public"]["Tables"]["user_favorites"]["Row"]
export type UserLocation = Database["public"]["Tables"]["user_locations"]["Row"]
