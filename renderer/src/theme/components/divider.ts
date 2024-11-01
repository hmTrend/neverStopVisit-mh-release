import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  opacity: 'unset',
  borderColor: 'border.default',
  borderWidth: '1px',
})

export const dividerTheme = defineStyleConfig({
  baseStyle,
})
