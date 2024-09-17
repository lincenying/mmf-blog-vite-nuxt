import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function useAutoScroll(key: string) {
    const scrollTop = useState<number>(key)

    function onScroll(event: { scrollLeft: number; scrollTop: number }) {
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
