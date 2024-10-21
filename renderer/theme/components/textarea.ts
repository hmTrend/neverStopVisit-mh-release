import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { mergeWith } from '@chakra-ui/utils'
import { defineWithBaseFormStyle } from '../foundations/baseStyles'
import { inputTheme } from './input'

const baseStyle = defineWithBaseFormStyle({
  width: '100%',
  outline: 0,
  transition: 'all 250ms',
  py: 4,
  px: 6,
})

const variants = {
  outline: defineStyle(
    mergeWith(inputTheme.variants?.outline.field, {
      bg: 'transparent',
    }) ?? {},
  ),
}

const defaultProps = {
  variant: 'outline',
} as const

export const textareaTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps,
})
