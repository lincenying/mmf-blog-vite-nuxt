/**
 * 上传 API 根地址（来自 runtimeConfig.public.uploadApi）
 */
export function useUploadApi() {
    const config = useRuntimeConfig()
    return computed(() => String(config.public.uploadApi || ''))
}
