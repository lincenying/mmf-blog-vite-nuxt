import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * 自动记录/恢复滚动条位置
 * @param key - 用于存储滚动位置的键
 * @returns 设置滚动条函数
 */
export function useAutoScroll(key: string) {
    const scrollTop = useState<number>(key)

    function onScroll(event: { scrollLeft: number, scrollTop: number }) {
        scrollTop.value = event.scrollTop
    }

    onBeforeRouteLeave((_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
        scrollTop.value = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
        next()
    })

    onMounted(() => {
        console.log('onMounted', scrollTop.value)
        if (scrollTop.value) {
            setTimeout(() => {
                window.scrollTo(0, scrollTop.value)
            }, 50)
        }
    })
    onActivated(() => {
        console.log('onActivated', scrollTop.value)
        if (scrollTop.value) {
            setTimeout(() => {
                window.scrollTo(0, scrollTop.value)
            }, 50)
        }
    })

    return {
        onScroll,
    }
}
