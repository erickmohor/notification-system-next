import { createStitches } from '@stitches/react'

export const { config, css, styled, getCssText, globalCss, keyframes, theme, createTheme } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      black: '#000',

      red300: '#DB3848',

      gray200: '#F8F8F8',
      gray300: '#F3F3F3',
      gray400: '#D7D7D7',
      gray500: '#909090',
      gray700: '#3A3A3A',
      gray800: '#202024',

      blue300: '#4556A9',
      blue500: '#39478C',

      cyan300: '#1DA2B7',
    },
    fontSizes: {
      'xxs': '0.625rem',
      'xs': '0.75rem',
      'sm': '0.875rem',
      'md': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '3rem',
      '7xl': '4rem',
      '8xl': '4.5rem',
      '9xl': '6rem',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      40: '10rem',
      64: '16rem',
      80: '20rem',
    },
    radii: {
      px: '1px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '16px',
      full: '99999px',
    },
  }
})