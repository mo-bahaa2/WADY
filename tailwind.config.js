export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1A1F3D',
          900: '#141833',
          800: '#1A1F3D',
          700: '#252B4E',
          600: '#343B63',
          500: '#4A5179',
          400: '#6E7492',
          300: '#9096AE',
          200: '#C3C7D5',
          100: '#E2E4EC',
          50: '#F1F2F7',
        },
        orange: {
          DEFAULT: '#FF6835',
          700: '#D24C1F',
          600: '#EA5A28',
          500: '#FF6835',
          200: '#FFC9B5',
          100: '#FFE7DD',
          50: '#FFF3EE',
        },
        purple: {
          DEFAULT: '#6C63FF',
          700: '#4C44D4',
          600: '#5B52ED',
          500: '#6C63FF',
          200: '#C4C0FF',
          100: '#E6E4FF',
          50: '#F2F1FF',
        },
        canvas: '#F2F4F8',
        ink: {
          DEFAULT: '#1E1E1E',
          muted: '#5F657C',
          subtle: '#8A90A5',
        },
        line: {
          DEFAULT: '#E4E7EF',
          strong: '#D3D8E4',
        },
        success: {
          DEFAULT: '#12805C',
          100: '#DFF2EB',
          200: '#A8DBC9',
        },
        danger: {
          DEFAULT: '#C0392B',
          100: '#FBE6E3',
          200: '#F0B7B0',
        },
        warn: {
          DEFAULT: '#A96A0B',
          100: '#FBEEDB',
          200: '#EBCD9B',
        },
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26, 31, 61, 0.04), 0 1px 3px rgba(26, 31, 61, 0.03)',
        pop: '0 8px 28px rgba(26, 31, 61, 0.12)',
      },
    },
  },
  plugins: [],
};
