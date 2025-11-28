import { useContext, useState, useEffect, createContext, type PropsWithChildren } from 'react'
import { useRouter } from 'expo-router'
import { useStorageState } from '@/hooks/use-storage'
import useApi from "@/hooks/use-api"

import { LOGIN_PAYLOAD } from '@/types'

const AuthContext = createContext<{
    signIn: (payload: LOGIN_PAYLOAD) => void
    signOut: () => void
    selectGroup: (id: string) => void
    session?: string | null
    groupId?: string | null
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    selectGroup: () => null,
    session: null,
    groupId: null,
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
    const [groupId, setGroupId] = useState<string>('')

    const handleSelectGroup = (id: string) => {
        setGroupId(id)
    }

    const handleLogin = async(payload: LOGIN_PAYLOAD) => {
        try {
            const data = await apiFetch<{token: string}>("/auth/login", {
                method: "POST",
                body: payload
            })
            setSession(data?.token as string)
            router.replace('/groups')
        } catch (err) {
            console.error(err)
            throw err
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
                selectGroup: (id: string) => {
                    handleSelectGroup(id)
                },
                session,
                groupId,
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