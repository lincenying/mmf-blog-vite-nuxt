import lincy from '@lincy/eslint-config'

export default lincy(
    {
        unocss: true,
        formatters: true,
        ignores: [
            'public',
            'src/polyfill',
            '.output/**',
        ],
    },
)
