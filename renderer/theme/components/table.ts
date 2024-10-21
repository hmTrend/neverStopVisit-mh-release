import { tableAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
  },

  caption: {
    color: 'fg.default',
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium',
  },
})

const simpleStyle = definePartsStyle({
  th: {
    bg: 'bg.subtle',
    color: 'fg.default',
    fontWeight: 'bold',
    fontSize: 'md',
    height: 14,
    border: 'unset',
  },
  td: {
    bg: 'bg.surface',
    color: 'fg.default',
    borderBottom: 'unset',
  },
})

const stripedStyle = definePartsStyle({
  thead: {
    '*': {
      bg: 'bg.accent.default',
      color: 'fg.accent.default !important',
    },
  },
  th: {
    fontWeight: 'bold',
    fontSize: 'md',
    height: 14,
    border: 'unset',
  },
  td: {
    bg: 'bg.surface',
    color: 'fg.default',
    borderBottom: 'unset',
  },
  tbody: {
    td: {
      bg: 'unset',
    },

    tr: {
      '&:nth-of-type(odd)': {
        td: {
          bg: 'bg.subtle',
        },
      },
      '&:nth-of-type(even)': {
        color: 'red.500',
        td: {
          bg: 'bg.muted',
        },
      },
    },
  },
})

const variants = {
  simple: simpleStyle,
  striped: stripedStyle,
}

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
})
