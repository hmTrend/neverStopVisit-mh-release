import { switchAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    color: 'fg.default',
    me: 2,
  },
  track: {
    bg: 'bg.muted',
    p: 1,
    _checked: {
      bg: 'accent',
      _disabled: {
        // * prop thumb.disabled not forwared
        '>span': {
          bg: 'bg.subtle',
        },
      },
    },
    _focus: {
      boxShadow: 'none',
    },
    _disabled: {
      // * prop thumb.disabled not forwared
      '>span': {
        bg: 'disabled',
      },
      bg: 'accent-subtle',
      _checked: {
        bg: 'fg.accent.disabled',
      },
    },
  },
  thumb: {
    bg: 'fg.accent.default',
    border: '1px solid',
    borderColor: 'bg.muted',
    _checked: {
      borderColor: 'accent',
    },
  },
})

const sizes = {
  sm: {
    track: { w: 9, h: 3 },
    thumb: {
      marginTop: -1.5,
      marginLeft: -1.5,
      w: 6,
      h: 6,
      _checked: {
        transform: 'translateX(1.5rem)',
      },
    },
  },
}

const defaultProps = {
  size: 'sm',
} as const

export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps,
})
