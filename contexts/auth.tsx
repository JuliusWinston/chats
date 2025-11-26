import { useContext, createContext, type PropsWithChildren } from 'react'
import { useRouter } from 'expo-router'
import { useStorageState } from '@/hooks/use-storage'
import useApi from "@/hooks/use-api"

import { LOGIN_PAYLOAD } from '@/types'

const AuthContext = createContext<{
    signIn: (payload: LOGIN_PAYLOAD) => void
    signOut: () => void
    session?: string | null
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false
})

// This hook can be used to access the user info
const useSession = () => {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />')
    }

    return value
}

const SessionProvider = ({ children }: PropsWithChildren) => {
    const { apiFetch } = useApi()
    const router = useRouter()
    const [[isLoading, session], setSession] = useStorageState('session')

    const handleLogin = async(payload: LOGIN_PAYLOAD) => {
        try {
            const data = await apiFetch<{token: string}>("/auth/login", {
                method: "POST",
                body: payload
            })
            console.log('auth response: ', JSON.stringify(data))
            setSession(data?.token)
            router.navigate("/(tabs)")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn: (payload: LOGIN_PAYLOAD) => {
                    handleLogin(payload)
                },
                signOut: () => {
                    setSession(null)
                },
                session,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    useSession,
    SessionProvider
}