"use server"

import { createClient } from '@supabase/supabase-js'

export default async function(profileId: string) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SERViCE_ROLE_KEY, {  auth: {    autoRefreshToken: false,    persistSession: false  }}
    )

    const { data, error } = await supabase.auth.admin.deleteUser(profileId)

    if (error) {
        console.error('Error deleting user:', error)
        throw new Error('Failed to delete user')
    }
}