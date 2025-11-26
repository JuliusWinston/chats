import { useEffect, useCallback, useReducer } from "react"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

const useAsyncState = <T>(
    initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> => {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>
}

const setStorageItemAsync = async (key: string, value: string | null) => {
    if (process.env.EXPO_OS === 'web') {
        if (value === null) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, value)
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key)
        } else {
            await SecureStore.setItemAsync(key, value)
        }
    }
}

const useStorageState = (key: string): UseStateHook<string> => {
    // Public
    const [state, setState] = useAsyncState<string>()

    // Get
    useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    setState(localStorage.getItem(key))
                }
            } catch (e) {
                console.error('Local storage is unavailable: ', e)
            }
        } else {
            SecureStore.getItemAsync(key).then((value: string | null) => {
                setState(value)
            })
        }
    }, [key])

    // Set
    const setValue = useCallback(
        (value: string | null) => {
            setState(value)
            setStorageItemAsync(key, value)
        },
        [key]
    )

    return [state, setValue]
}

export {
    setStorageItemAsync,
    useStorageState
}