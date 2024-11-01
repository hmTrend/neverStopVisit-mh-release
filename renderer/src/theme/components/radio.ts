import { radioAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { defineWithBaseFormStyle } from '../foundations/baseStyles'
import { checkboxTheme } from './checkbox'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  control: defineWithBaseFormStyle({
    boxShadow: 'none',
    bg: 'fg.accent.default',
    background: 'accent',
    borderRadius: 'full',
    borderColor: 'accent',
    _hover: {
      bg: 'fg.accent.default',
      boxShadow: 'none',
      _checked: {
        background: 'fg.accent.default',
        borderColor: 'accent',
        bg: 'fg.accent.default',
      },
      _disabled: {
        bg: 'unset',
      },
    },
    _active: {
      boxShadow: 'none',
    },
    _checked: {
      background: 'fg.accent.default',
      borderColor: 'accent',
      _before: {
        bg: 'accent',
      },
      _disabled: {
        borderColor: 'bg.accent.emphasis',
        _hover: {
          borderColor: 'bg.accent.emphasis',
        },
        bg: 'fg.accent.default',
      },
    },
    _disabled: {
      bg: 'fg.accent.default',
      _before: {
        bg: 'bg.accent.emphasis',
      },
      _hover: {
        _before: {
          bg: 'bg.accent.emphasis',
        },
      },
    },
  }),
  label: checkboxTheme.baseStyle?.label,
})

const sizes = {
  md: {
    control: {
      width: 6,
      height: 6,
      _checked: {
        _before: {
          w: 4,
          h: 4,
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
          w: 4,
          h: 4,
        },
      },
    },
    Label: { fontSize: 'md' },
  },
}

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
})
