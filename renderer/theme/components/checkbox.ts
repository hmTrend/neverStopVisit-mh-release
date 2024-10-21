import { checkboxAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { defineWithBaseFormStyle } from '../foundations/baseStyles'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  icon: {
    color: 'fg.accent.default',
  },
  control: defineWithBaseFormStyle({
    '>div>svg': {
      color: 'accent',
    },
    _hover: {
      boxShadow: 'none',
    },
    _active: {
      boxShadow: 'none',
    },
    _checked: {
      bg: 'accent',
      borderColor: 'accent',
      '>div>svg': {
        color: 'fg.accent.default',
      },
      _hover: {
        bg: 'bg.accent.muted',
        boxShadow: 'non',
        borderColor: 'bg.accent.muted',
      },
      _active: {
        boxShadow: 'none',
      },
    },
  }),
  label: {
    color: 'fg.default',
    _disabled: {
      opacity: 'unset',
      color: 'disabled',
    },
  },
})

const sizes = {
  md: {
    control: {
      width: 6,
      height: 6,
      _checked: {
        _before: {
          w: 2.5,
          h: 2.5,
        },
      },
    },
    label: { fontSize: 'sm' },
  },
  lg: {
    control: {
      width: 6,
      height: 6,
      _checked: {
        _before: {
          w: 3.5,
          h: 3.5,
        },
      },
    },
    Label: { fontSize: 'md' },
  },
}

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
})
