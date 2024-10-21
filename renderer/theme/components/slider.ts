import { sliderAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {},
  track: {
    bg: 'bg.subtle',
  },
  filledTrack: {
    bg: 'accent',
  },
  thumb: {
    height: 6,
    width: 6,
    bg: 'fg.accent.default',
    border: '1px solid',
    borderColor: 'accent',
    boxShadow: 'none',
    _focus: {
      boxShadow: 'none',
    },
  },
})

const variants = {
  solid: {
    track: {
      bg: 'bg.muted',
    },
  },
  'fg.accent.default': {
    track: {
      bg: 'bg.accent.default',
    },
    filledTrack: {
      bg: 'fg.accent.muted',
    },
  },
}

const defaultProps = {
  colorScheme: 'brand',
  variant: 'solid',
} as const

export const sliderTheme = defineMultiStyleConfig({
  variants,
  baseStyle,
  defaultProps,
})
