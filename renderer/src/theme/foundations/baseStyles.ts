import { defineStyle, SystemStyleInterpolation } from '@chakra-ui/styled-system'
import { mergeThemeOverride } from '@chakra-ui/theme-utils'

const baseFormStyle = defineStyle({
  borderRadius: 'none',
  background: 'none',
  color: 'inherit',
  borderColor: 'accent',
  _hover: {
    bg: 'unset',
    borderColor: 'accent',
    boxShadow: 'inset',
    _disabled: {
      _dark: {
        bg: 'unset',
      },
    },
  },
  _active: {
    bg: 'transparent',
    borderColor: 'accent',
    boxShadow: 'inset',
  },
  _disabled: {
    color: 'emphasized',
    _dark: {
      color: 'emphasized',
    },
    background: 'unset',
    borderColor: 'fg.accent.disabled',
    _hover: {
      borderColor: 'fg.accent.disabled',
      boxShadow: 'none',
      _dark: {
        boxShadow: 'none',
      },
    },
  },
  '>svg *, >span>svg *': {
    filter: 'grayscale(100%)',
  },
})

const baseFormOnAccentStyle = defineStyle({
  borderRadius: 'none',
  background: 'none',
  color: 'fg.accent.default',
  borderColor: 'fg.accent.default',
  _hover: {
    color: 'fg.accent.default',
    borderColor: 'fg.accent.default',
    boxShadow: 'inset-on-accent',
    _disabled: {
      _dark: {
        bg: 'unset',
      },
    },
  },
  _active: {
    bg: 'transparent',
    borderColor: 'fg.accent.default',
    boxShadow: 'inset-on-accent',
  },
  _disabled: {
    color: 'fg.accent.default',
    _dark: {
      color: 'fg.accent.default',
    },
    background: 'unset',
    borderColor: 'fg.accent.disabled',
    _hover: {
      borderColor: 'fg.accent.disabled',
      boxShadow: 'none',
      _dark: {
        boxShadow: 'none',
      },
    },
  },
  '>svg *, >span>svg *': {
    filter: 'grayscale(100%)',
  },
})

export const defineWithBaseFormStyle = <T extends SystemStyleInterpolation>(style: T): T =>
  mergeThemeOverride(baseFormStyle, defineStyle(style))

export const defineWithBaseFormOnAccentStyle = <T extends SystemStyleInterpolation>(style: T): T =>
  mergeThemeOverride(baseFormOnAccentStyle, defineStyle(style))
