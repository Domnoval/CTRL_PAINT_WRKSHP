import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Participant } from '@workshop/shared'

interface AuthState {
  // Core authentication data
  user: User | null
  session: Session | null
  participant: Participant | null

  // Authentication status
  isLoading: boolean
  isInitialized: boolean

  // Actions
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>

  // Initialization
  initialize: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      participant: null,
      isLoading: true,
      isInitialized: false,

      // Quantum authentication methods
      signIn: async (email: string, password: string) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (data.user && !error) {
          set({
            user: data.user,
            session: data.session,
            isLoading: false
          })
          // Fetch participant data after successful sign in
          await get().fetchParticipantData(data.user.id)
        } else {
          set({ isLoading: false })
        }

        return { error }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              workshop_role: 'participant',
            }
          }
        })

        if (data.user && !error) {
          set({
            user: data.user,
            session: data.session,
            isLoading: false
          })
          // Create participant profile
          await get().createParticipantProfile(data.user.id, name)
        } else {
          set({ isLoading: false })
        }

        return { error }
      },

      signOut: async () => {
        set({ isLoading: true })
        await supabase.auth.signOut()
        set({
          user: null,
          session: null,
          participant: null,
          isLoading: false,
          isInitialized: false
        })
      },

      resetPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        return { error }
      },

      initialize: async () => {
        // Setup Supabase session listener
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            set({
              user: session.user,
              session,
              isLoading: true
            })
            // Fetch participant data
            await get().fetchParticipantData(session.user.id)
          } else {
            set({
              user: null,
              session: null,
              participant: null,
              isLoading: false
            })
          }
          set({ isInitialized: true, isLoading: false })
        })
      },

  // Helper methods (internal)
  fetchParticipantData: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('participantId', userId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching participant data:', error)
        return
      }

      set({ participant: data || null })
    } catch (error) {
      console.error('Failed to fetch participant data:', error)
    }
  },

  createParticipantProfile: async (userId: string, name: string) => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .insert({
          participantId: userId,
          name,
          role: 'participant',
          observationStrength: 0,
          mysticalPrefs: {
            vibrationLevel: 0.5,
            colorHarmony: 'mystical',
            glyphLanguage: 'english',
            soundAmbiance: false,
          },
          sessionWifiHealth: 'good',
        } as any) // Using any to bypass type issues temporarily
        .select()

      if (error) {
        console.error('Error creating participant profile:', error)
        return
      }

      set({ participant: data?.[0] || null })
    } catch (error) {
      console.error('Failed to create participant profile:', error)
    }
  },
    }),
    {
      name: 'quantum-auth-store',
    }
  )
)

export default useAuth
