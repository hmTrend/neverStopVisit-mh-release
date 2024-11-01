import { formAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    label: {
      paddingX: 0,
    },
    'div: has(input):not([style*="flex-direction:row"]) label': {
      paddingX: 0,
      borderColor: 'transparent',
    },
    'label:has(+input), input, label:has(+div > input)': {
      paddingX: 2,
      borderX: '1px solid',
      borderTop: '1px solid',
      borderColor: 'accent',
      _groupFocus: {
        bg: 'accent',
        color: 'fg.accent.muted',
      },
      _disabled: {
        opacity: 1,
        color: 'disabled',
      },
    },
  },
})

export const formTheme = defineMultiStyleConfig({
  baseStyle,
})
