import defaultTheme from 'tailwindcss/defaultTheme';

/** Design tokens Learvia — lihat Design Brief bagian 3. */
export default {
  content: ['./resources/views/**/*.blade.php', './resources/js/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        // Palet mengikuti referensi dashboard SRMS: biru tegas, kartu putih, aksen berwarna lembut.
        canvas: '#F3F6FB',
        surface: { DEFAULT: '#FFFFFF', subtle: '#F7F9FC' },
        line: { DEFAULT: '#E6EBF3', strong: '#CBD5E4' },
        ink: { 900: '#111C3A', 700: '#3B4A66', 500: '#66758F' },
        primary: {
          50: '#EEF4FF', 100: '#DCE8FF', 200: '#BBD2FF', 400: '#5B8DF5', 500: '#2F6BF0',
          600: '#1E5BD8', 700: '#1749B0', 800: '#133B8C', 900: '#0F2D6B',
        },
        // Aksen kartu statistik / akses cepat: fg untuk ikon dan teks, bg untuk chip.
        tint: {
          'blue-fg': '#1E5BD8', 'blue-bg': '#E8F0FF',
          'green-fg': '#15803D', 'green-bg': '#E3F6EC',
          'purple-fg': '#6D3FD6', 'purple-bg': '#EFE9FF',
          'orange-fg': '#B45309', 'orange-bg': '#FFF1DB',
          'pink-fg': '#C2255C', 'pink-bg': '#FDE6EE',
          'cyan-fg': '#0B6E8F', 'cyan-bg': '#DDF1F8',
        },
        success: { fg: '#15803D', bg: '#E3F6EC' },
        warning: { fg: '#8A4B08', bg: '#FFF1DB' },
        danger: { fg: '#B3261E', bg: '#FDE7E9' },
        neutral: { fg: '#475569', bg: '#E9EDF3' },
        info: { fg: '#1749B0', bg: '#E8F0FF' },
        excuse: { fg: '#5B3FB0', bg: '#EEE9FB' },
        sick: { fg: '#0B6E8F', bg: '#DDF1F8' },
      },
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h1: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        h2: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        h3: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        stat: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        timer: ['1.75rem', { lineHeight: '2rem', fontWeight: '700' }],
        question: ['1.125rem', { lineHeight: '1.875rem', fontWeight: '500' }],
        'body-l': ['1rem', { lineHeight: '1.625rem' }],
        body: ['0.875rem', { lineHeight: '1.25rem' }],
        label: ['0.8125rem', { lineHeight: '1rem', fontWeight: '600' }],
        caption: ['0.75rem', { lineHeight: '1rem' }],
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
      boxShadow: {
        e1: '0 1px 3px rgba(16,40,90,.07)',
        e2: '0 10px 26px rgba(16,40,90,.12)',
        e3: '0 14px 36px rgba(16,40,90,.16)',
      },
    },
  },
};
