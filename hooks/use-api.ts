import { useStorageState } from "./use-storage"

type API_REQUEST = {
    method: "GET" | "POST" | "PUT" | "PATCH"
    query?: Record<string, any>
    headers?: Record<string, string>
    body?: Record<string, any>
    token?: string
}

const BASE_URL = "https://unswaying-nonoperating-aarav.ngrok-free.dev/api/v1"

const useApi = () => {

    const [[isLoading, session], setSession] = useStorageState('session')

    const apiFetch = async <T,>(
        endpoint: string, 
        options: API_REQUEST = { method: "GET" }
    ) => {
        let preparedHeaders: Record<string, string> = {
            "Content-Type": "Application/json",
            ...options.headers
        }
        if (session?.length) {
            preparedHeaders.Authorization = `Bearer ${session}`
        }

        let preparedQueries = ''

        if (options.query && Object.keys(options.query).length > 0) {
            const params = new URLSearchParams(options.query).toString()
            preparedQueries = `?${params}`
        }

        try {
            const response = await fetch(`${BASE_URL}${endpoint}${preparedQueries}`, {
                method: options.method,
                headers: preparedHeaders,
                body: JSON.stringify(options.body)
            })

            const data: T | null = await response.json()
            return data as T
        } catch (err) {
            throw err
        }
    }

    return {
        apiFetch
    }
}

export default useApi