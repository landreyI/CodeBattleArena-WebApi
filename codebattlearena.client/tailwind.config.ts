/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    lithMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                primary: 'var(--color-primary)',
                "primary-pressed": 'var(--color-primary-pressed)',

                blue: 'var(--color-blue)',
                green: 'var(--color-green)',
                red: 'var(--color-red)',
                yellow: 'var(--color-yellow)',
                purple: 'var(--color-purple)',
                gray: 'var(--color-gray)',
                bronze: 'var(--color-bronze)',
            },
        },
    },
    plugins: [],
}
