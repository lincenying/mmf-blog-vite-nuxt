import type { FetchOptions, SearchParameters } from 'ofetch'

export default () => {
    return {
        get: <T>(url: string, query?: SearchParameters, request?: FetchOptions) => {
            return $fetch<T>(url, {
                query,
                headers: {
                    ...request?.headers,
                    ...useRequestHeaders(['cookie']),
                },
                async onResponse({ response }) {
                    if (response._data.code !== 200)
                        showMsg(response._data.message)
                },
                ...request,
                method: 'GET',
            })
        },
        post: <T>(url: string, body?: SearchParameters, request?: FetchOptions) => {
            return $fetch<T>(url, {
                body,
                async onResponse({ response }) {
                    if (response._data.code !== 200)
                        showMsg(response._data.message)
                },
                headers: {
                    ...request?.headers,
                    ...useRequestHeaders(['cookie']),
                },
                ...request,
                method: 'POST',
            })
        },
    }
}
