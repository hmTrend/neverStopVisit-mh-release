const baseStyle = {
  track: {
    borderRadius: 'base',
  },
}

const variants = {
  solid: {
    track: {
      bg: 'bg.muted',
    },
  },
  'fg.accent.default': {
    track: {
      bg: 'bg.accent.default',
    },
    filledTrack: {
      bg: 'fg.accent.muted',
    },
  },
}

const defaultProps = {
  colorScheme: 'brand',
  variant: 'solid',
}

export const progressTheme = {
  variants,
  baseStyle,
  defaultProps,
}
