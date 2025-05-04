/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            primary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
                950: '#1e1b4b',
            },
            secondary: {
                50: '#f0fdf4',
                100: '#dcfce7',
                200: '#bbf7d0',
                300: '#86efac',
                400: '#4ade80',
                500: '#22c55e',
                600: '#16a34a',
                700: '#15803d',
                800: '#166534',
                900: '#14532d',
                950: '#052e16',
            }
        },
        fontSize: {
            'xxs': '0.625rem',
        },
        animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        boxShadow: {
            'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        },
        borderRadius: {
            'xl': '1rem',
            '2xl': '1.5rem',
        },
    },
};
export const plugins = [
    // Additional plugins if needed
];