export type AppMessageType = 'success' | 'warning' | 'info' | 'error'

export interface AppMessageConfig {
    type?: AppMessageType
    content?: string
}

/**
 * element-plus弹窗
 * @param config 弹窗数据
 * @example
 * ```
 * showMsg('content')
 * showMsg({ type: 'success' | 'warning' | 'info' | 'error', content: 'content'})
 * ```
 */
export function showMsg(config?: AppMessageConfig | string) {
    let content = '接口返回数据错误'
    let type: AppMessageType = 'error'
    if (typeof config === 'string' && config) {
        content = config
    }
    else if (config && typeof config === 'object') {
        content = config.content || content
        type = config.type || 'error'
    }
    if (!import.meta.client) {
        return
    }
    ElMessage[type](content)
}

/**
 * 只采纳最后一次异步请求的结果，丢弃过期响应
 */
export function createLatestGuard() {
    let current = 0
    return {
        /**
         * 开始一次新请求并返回序号
         */
        next() {
            current += 1
            return current
        },
        /**
         * 判断序号是否仍是最新请求
         */
        isLatest(token: number) {
            return token === current
        },
    }
}

/**
 * 把路由参数规范成单个字符串
 * @param id 路由 id，可能是字符串或数组
 */
export function toSingleId(id?: string | string[] | null) {
    if (Array.isArray(id)) {
        return id[0] ? String(id[0]) : ''
    }
    if (id == null) {
        return ''
    }
    return String(id)
}

/** 将换行符替换为 \<br\> */
export function nl2br(str: string) {
    if (!str)
        return ''
    return str.replace(/\n/g, '<br>')
}

/** 将cookies中的Path替换成'/' */
export function normalizeCookiePath(cookieStr: string): string {
    // 拆分 Cookie 字符串为键值对数组
    const parts = cookieStr.split('; ')
    if (parts.length === 0)
        return cookieStr

    // 存储处理后的部分
    const processedParts: string[] = []
    // 标记是否找到 Path 属性
    let foundPath = false

    // 处理第一个键值对（Cookie 名称和值）
    processedParts.push(parts[0]!)

    // 遍历剩余属性
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i]!
        // 查找等号位置以分离键值
        const eqIndex = part.indexOf('=')

        if (eqIndex === -1) {
            // 无等号部分（如 HttpOnly）直接保留
            processedParts.push(part)
        }
        else {
            // 提取属性名（key）和值（value）
            const key = part.substring(0, eqIndex).trim()
            const _value = part.substring(eqIndex + 1).trim()

            // 检测 Path 属性（不区分大小写）
            if (key.toLowerCase() === 'path') {
                // 标记找到 Path，并替换为根路径
                foundPath = true
                processedParts.push('Path=/')
            }
            else {
                // 非 Path 属性原样保留
                processedParts.push(part)
            }
        }
    }

    // 未找到 Path 时自动添加
    if (!foundPath) {
        processedParts.push('Path=/')
    }

    // 重新组合为 Cookie 字符串
    return processedParts.join('; ')
}

/**
 * 平滑滚动到指定元素
 * @param target 目标元素
 * @param adjust 额外偏移
 */
export function scrollToElement(target: Ref<HTMLElement | undefined>, adjust: number = 0): void {
    let top = target.value?.getBoundingClientRect().top
    if (top !== undefined) {
        top += window.scrollY + adjust
    }
    window.scrollTo({ top: top || 0, behavior: 'smooth' })
}

/**
 * 滚动到导航元素的位置
 * @param navigation 导航元素
 * @param adjust 额外偏移
 */
export function scrollToNav(navigation: Ref<HTMLElement | undefined>, adjust: number = 0): void {
    scrollToElement(navigation, adjust)
}

/**
 * 滚动到评论的位置
 * @param commentBox 评论元素
 * @param adjust 额外偏移
 */
export function scrollToComment(commentBox: Ref<HTMLElement | undefined>, adjust: number = 0): void {
    scrollToElement(commentBox, adjust)
}

/**
 *
 * @param cookies cookies字符串
 * @returns object
 */
export function utilsParseCookies(cookies: string): { [key: string]: string } {
    const cookieArr = cookies.split(';')
    const cookieObj: { [key: string]: string } = {}
    cookieArr.forEach((cookie) => {
        const separator = cookie.indexOf('=')
        if (separator <= 0) {
            return
        }
        const cookieKey = cookie.slice(0, separator).trim()
        const rawValue = cookie.slice(separator + 1).trim()
        if (!cookieKey || !rawValue) {
            return
        }
        try {
            cookieObj[cookieKey] = decodeURIComponent(rawValue)
        }
        catch {
            cookieObj[cookieKey] = rawValue
        }
    })

    return cookieObj
}
