import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { defineWithBaseFormOnAccentStyle, defineWithBaseFormStyle } from '../foundations/baseStyles'

const baseStyle = defineStyle({
  borderRadius: 'base',
  fontWeight: 'semibold',
  '.chakra-button__group > &:first-of-type': {
    marginRight: '0!important',
  },
})

const primaryStyle = defineWithBaseFormStyle({
  color: 'fg.accent.default',
  background: 'accent',
  flexShrink: 0,
  borderWidth: '1px',
  _hover: {
    background: 'bg.accent.muted',
    boxShadow: 'none',
    borderColor: 'bg.accent.muted',
  },
  _active: {
    background: 'bg.accent.muted',
    boxShadow: 'none',
    borderColor: 'bg.accent.muted',
  },
})

const secondaryStyle = defineWithBaseFormStyle({
  flexShrink: 0,
  bg: 'transparent',
  color: 'emphasized',
  borderWidth: '1px',
})

const tertiaryStyle = defineWithBaseFormStyle({
  flexShrink: 0,
  _hover: {
    boxShadow: 'unset',
    bg: 'bg.subtle',
  },
  _active: {
    boxShadow: 'unset',
    bg: 'bg.subtle',
  },
  _activeLink: {
    bg: 'fg.accent.muted',
    color: 'inverted',
  },
})

const secondaryOnAccentStyle = defineWithBaseFormOnAccentStyle({
  flexShrink: 0,
  borderWidth: '1px',
})

const textStyle = defineStyle({
  padding: 0,
  color: 'muted',
  textTransform: 'normal',
  fontWeight: 'normal',
  fontSize: 'md',
  borderBottom: '2px solid',
  borderBottomColor: 'transparent',
  _hover: {
    color: 'muted',
    textDecoration: 'none',
    borderBottomColor: 'accent',
  },
  _active: {
    color: 'muted',
  },
})

const tertiaryAccent = defineWithBaseFormOnAccentStyle({
  flexShrink: 0,
  _hover: {
    bg: 'bg.accent.subtle',
    border: 'unset',
    boxShadow: 'none',
  },
  _active: {
    bg: 'bg.accent.subtle',
    border: 'unset',
    boxShadow: 'none',
  },
  _activeLink: {
    bg: 'bg.accent.subtle',
  },
})

const textAccentStyle = defineStyle({
  padding: 0,
  height: 'auto',
  lineHeight: 'normal',
  verticalAlign: 'baseline',
  color: 'brand.50',
  _hover: {
    color: 'white',
  },
  _active: {
    color: 'white',
  },
})

const primaryOnAccentStyle = defineStyle({
  bg: 'fg.accent.default',
  color: 'accent',
  border: '1px',
  borderColor: 'fg.accent.default',
  _hover: {
    color: 'accent',
    bg: 'fg.accent.muted',
    borderColor: 'fg.accent.default',
    _disabled: {
      background: 'fg.accent.default',
      color: 'accent',
    },
  },
  _active: { bg: 'fg.accent.muted', color: 'accent' },
})

const variants = {
  primary: primaryStyle,
  secondary: secondaryStyle,
  solid: primaryStyle,
  tertiary: tertiaryStyle,
  text: textStyle,
  'primary.accent': primaryOnAccentStyle,
  'secondary.accent': secondaryOnAccentStyle,
  'tertiary.accent': tertiaryAccent,
  'text.accent': textAccentStyle,
}

const sizes = {
  '2xs': defineStyle({
    h: '6',
    minW: '6',
    fontSize: '2xs',
    px: '2',
    '& svg': {
      fontSize: 'sm',
    },
  }),
  xs: defineStyle({
    h: '8',
    minW: '8',
    fontSize: 'xs',
    lineHeight: '1.125rem',
    px: '2',
    '& svg': {
      fontSize: 'md',
    },
  }),
  sm: defineStyle({
    h: '9',
    minW: '9',
    fontSize: 'sm',
    lineHeight: '1.25rem',
    px: '3.5',
    '& svg': {
      fontSize: 'xl',
    },
  }),
  md: defineStyle({
    h: '10',
    minW: '10',
    fontSize: 'sm',
    lineHeight: '1.25rem',
    px: '4',
    '& svg': {
      fontSize: 'xl',
    },
  }),
  lg: defineStyle({
    h: '11',
    minW: '11',
    fontSize: 'md',
    lineHeight: '1.5rem',
    px: '4.5',
    '& svg': {
      fontSize: 'xl',
    },
  }),
  xl: defineStyle({
    h: '12',
    minW: '12',
    fontSize: 'md',
    lineHeight: '1.5rem',
    px: '5',
    '& svg': {
      fontSize: 'xl',
    },
  }),
  '2xl': defineStyle({
    h: '15',
    minW: '15',
    fontSize: 'lg',
    lineHeight: '1.75rem',
    px: '7',
    '& svg': {
      fontSize: '2xl',
    },
  }),
}

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
})
