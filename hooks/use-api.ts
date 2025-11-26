type API_REQUEST = {
    method: "GET" | "POST" | "PUT" | "PATCH"
    query?: Record<string, any>
    headers?: Record<string, string>
    body?: Record<string, any>
    token?: string
}

const BASE_URL = "https://unswaying-nonoperating-aarav.ngrok-free.dev/api/v1"

const useApi = () => {

    const apiFetch = async <T,>(
        endpoint: string, 
        options: API_REQUEST = { method: "GET" }
    ) => {
        let preparedHeaders: Record<string, string> = {
            "Content-Type": "Application/json",
            ...options.headers
        }
        if (options.token?.length) {
            preparedHeaders.Authorization = `Bearer ${options.token}`
        }

        /**
         * 
         * Convert the query object into a usable query string
         */
        let preparedQueries: string = '?'

        if (options.query) {
            const keys: string[] = Object.keys(options.query)
            const values: string[] = Object.values(options.query)

            for (let i = 0; i < keys.length; i++) {
                if (i === 0) {
                    preparedQueries = preparedQueries + `${keys[i]}=${values[i]}`
                }
                else {
                    preparedQueries = preparedQueries + `&${keys[i]}=${values[i]}`
                }
            }
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