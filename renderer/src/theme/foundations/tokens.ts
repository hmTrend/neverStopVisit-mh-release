import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import shadows from './shadows'

export const getColorDefault = (props: StyleFunctionProps) =>
  mode(`${props.colorScheme}.500`, `${props.colorScheme}.400`)(props)

export const getBgMuted = (props: StyleFunctionProps) =>
  mode(`${props.colorScheme}.300`, `${props.colorScheme}.600`)(props)

export default {
  colors: {
    'bg.canvas': {
      default: 'gray.50',
      _dark: 'gray.950',
    },
    'bg.surface': {
      default: 'white',
      _dark: 'gray.900',
    },
    'bg.subtle': {
      default: 'gray.100',
      _dark: 'gray.800',
    },
    'bg.muted': {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    'fg.default': {
      default: 'black',
      _dark: 'white',
    },
    'fg.emphasized': {
      default: 'black',
      _dark: 'white',
    },
    'fg.muted': {
      default: 'gray.700',
      _dark: 'gray.200',
    },
    'fg.subtle': {
      default: 'gray.500',
      _dark: 'gray.400',
    },
    'fg.disabled': { default: 'gray.400', _dark: 'gray.600' },
    'on-disabled': { default: 'gray.600', _dark: 'gray.300' },
    'fg.accent.default': { default: 'white', _dark: 'gray.950' },
    'fg.accent.muted': { default: 'gray.100', _dark: 'gray.600' },
    'fg.accent.subtle': { default: 'gray.50', _dark: 'gray.500' },
    'fg.accent.emphasis': { default: 'gray.950', _dark: 'white' },
    accent: { default: 'gray.950', _dark: 'white' },
    'bg.accent.default': { default: 'gray.950', _dark: 'white' },

    'accent-subtle': { default: 'gray.100', _dark: 'gray.50' },
    'bg.accent.subtle': { default: 'gray.800', _dark: 'gray.100' },

    'accent-muted': { default: 'gray.600', _dark: 'gray.200' },
    'bg.accent.muted': { default: 'gray.400', _dark: 'gray.200' },

    'bg.accent.emphasis': { default: 'gray.100', _dark: 'gray.500' },
    'fg.accent.disabled': { default: 'gray.300', _dark: 'gray.600' },
    'border.default': 'accent',
    'border.emphasized': 'accent',
    'border.disabled': 'gray.200',
    'input-placeholder': 'gray.500',
  },
  shadows,
}
