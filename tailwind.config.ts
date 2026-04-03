import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7C3AED',
          muted: '#EDE9FE'
        }
      }
    }
  },
  plugins: []
};

export default config;
