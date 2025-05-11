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
                fadeIn: 'fadeIn 0.15s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(-4px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',

                blue: 'var(--color-blue)',
                'blue-foreground': 'var(--color-primary-foreground)',

                green: 'var(--color-green)',
                red: 'var(--color-red)',
                yellow: 'var(--color-yellow)',
                violet: 'var(--color-violet)',
                gray: 'var(--color-gray)',
            },
        },
    },
    plugins: [],
}
