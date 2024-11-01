import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  display: 'inline-block',
  marginBottom: 0,
  paddingY: 0,
  paddingX: 2,
  color: 'accent-muted',
  fontWeight: 'regular',
})

const sizes = {
  sm: defineStyle({
    lineHeight: '1.7',
    fontSize: 'xs',
  }),
  md: defineStyle({
    lineHeight: '1.7',
    fontSize: 'xs',
  }),
  lg: defineStyle({
    lineHeight: 'tall',
    fontSize: 'sm',
  }),
}

export const formLabelTheme = defineStyleConfig({
  baseStyle,
  sizes,
})
