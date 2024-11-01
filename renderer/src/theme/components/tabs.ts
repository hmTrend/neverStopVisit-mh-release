import { tabsAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle((props) => ({
  root: {
    pos: 'relative',
  },
  tab: {
    flex: props.isFitted ? 1 : undefined,
    color: 'subtle',
    textTransform: 'uppercase',
    fontSize: 'sm',
    _selected: {
      color: 'accent',
    },
  },
}))

const getVariantLine = definePartsStyle((props) => {
  const { colorScheme } = props
  const borderProp = props.orientation === 'vertical' ? 'borderStart' : 'borderBottom'

  return {
    tablist: {
      borderBottom: 'unset',
      borderStart: 'unset',
    },
    tab: {
      _selected: {
        borderColor: 'accent',
        [borderProp + 'Width']: '2px',
      },
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
      },
    },
    indicator: {
      bg: mode(`${colorScheme}.500`, `${colorScheme}.400`)(props),
      mt: -1,
      height: 1,
      borderTopRadius: 'base',
      position: 'absolute',
    },
  }
})

const getVariantEnclosed = definePartsStyle({
  tab: {
    _selected: {
      borderBottomColor: 'bg.surface',
    },
  },
})

const getVariantUnstyled = definePartsStyle({
  tab: {
    color: 'muted',
  },
})

const indicatorStyle = definePartsStyle(() => {
  return {
    tablist: {
      bg: 'bg.accent.default',
    },
    tab: {
      color: 'fg.accent.subtle',
      _selected: {
        color: 'fg.emphasized',
      },
    },
    indicator: {
      boxShadow: 'none',
      bg: 'white',
      _dark: {
        bg: 'black',
      },
    },
  }
})

const variants = {
  line: getVariantLine,
  enclosed: getVariantEnclosed,
  unstyled: getVariantUnstyled,
  indicator: indicatorStyle,
}

const defaultProps = {
  variant: 'line',
} as const

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps,
})
