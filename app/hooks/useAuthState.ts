import { create } from "zustand"

interface AuthState {
  error: string
  success: string
  loading: boolean
  setError: (error: string) => void
  setSuccess: (success: string) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useAuthState = create<AuthState>((set) => ({
  error: "",
  success: "",
  loading: false,
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ error: "", success: "", loading: false }),
}))
