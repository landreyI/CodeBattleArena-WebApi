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
                // ������ ��������� ����� ��� ���
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                // �������� ���� ������ ���������� ��� �����
            },
        },
    },
    plugins: [],
}
