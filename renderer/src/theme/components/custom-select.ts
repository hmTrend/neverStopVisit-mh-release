import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { defineWithBaseFormStyle } from '../foundations/baseStyles'
import { selectTheme } from './select'

const baseStyle = defineStyle({
  menu: defineWithBaseFormStyle({
    maxW: 'xs',
  }),
})

const variants = {
  outline: defineStyle((props) => ({
    menu: defineWithBaseFormStyle({
      mt: '-4px',
      py: 0,
      px: 0,
      bg: 'bg.surface',
      overflow: 'hidden',
      border: '2px',
      _hover: {
        boxShadow: 'none',
      },
    }),
    option: {
      _selected: {
        borderY: '2px',
        borderColor: 'accent',
        background: 'unset',
      },
      _hover: {
        boxShadow: 'none',
        bg: 'bg.muted',
        color: 'fg.accent.default',
      },
    },
    field: {
      ...selectTheme.variants?.outline(props).field,
      _expanded: defineWithBaseFormStyle({}),
    },
  })),
}

export const customSelectTheme = defineStyleConfig({
  baseStyle,
  variants,
})
