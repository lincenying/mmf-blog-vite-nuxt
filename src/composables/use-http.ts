import type { SearchParameters } from 'ofetch'
import md5 from 'md5'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export interface RequestOptions {
    method?: any
    headers?: Record<string, string> | [key: string, value: string][] | Headers
    key?: string
    body?: RequestInit['body'] | Record<string, any>
}

function _useFetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body
    return useFetch<T>(url as string, {
        key: options?.key ?? md5(url as string),
        method,
        params: { ...params },
        headers: {
            ...headers,
            ...options?.headers,
        },
        credentials: 'include',
        body: method === 'POST' ? body : undefined,
        onRequest() {
            // Set the request headers
            // options.headers = options.headers || {};
        },
        onRequestError({ error }) {
            ElMessage.closeAll()
            if (error)
                ElMessage.error('Sorry, The Data Request Failed')
            // Handle the request errors
        },
        onResponse({ response }) {
            // Process the response data
            if (response._data.code !== 200) {
                ElMessage.error(response._data.message)
            }

            return response._data
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

function _fetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body
    return $fetch<T>(url as string, {
        method,
        params: { ...params },
        headers: {
            ...headers,
            ...options?.headers,
        },
        credentials: 'include',
        body: method === 'POST' ? body : undefined,
        onRequest() {
            // Set the request headers
            // options.headers = options.headers || {};
        },
        onRequestError({ error }) {
            ElMessage.closeAll()
            if (error)
                ElMessage.error('Sorry, The Data Request Failed')
            // Handle the request errors
        },
        onResponse({ response }) {
            // Process the response data
            if (response._data.code !== 200) {
                ElMessage.error(response._data.message)
            }

            return response._data
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

export default () => {
    return {
        /**
         * $fetch.GET 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, body 参数
         * @returns $fetch
         */
        $get: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'GET', ...option })
        },
        /**
         * $fetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, body 参数
         * @returns $fetch
         */
        $post: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'POST', ...option })
        },
        /**
         * useFetch.GET 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns useFetch
         */
        get: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'GET', ...option })
        },
        /**
         * useFetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns useFetch
         */
        post: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'POST', ...option })
        },
    }
}
