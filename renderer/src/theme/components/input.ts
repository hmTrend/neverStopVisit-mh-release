import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import {
  defineWithBaseFormOnAccentStyle,
  defineWithBaseFormStyle,
} from '../foundations/baseStyles';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const outlineStyle = definePartsStyle({
  field: defineWithBaseFormStyle({
    _placeholder: {
      opacity: 'unset',
      color: 'subtle',
      display: 'block',
    },
    _focus: {
      borderColor: 'accent',
      boxShadow: 'inset',
    },
  }),
  addon: {
    bg: 'blackAlpha.100',
    _dark: {
      bg: 'whiteAlpha.100',
    },
    color: 'default',
    border: '1px solid',
    borderColor: 'border.default',
    marginEnd: '-1px',
  },
});

/* eslint-disable no-unused-vars */
const outlineOnAccentStyle = definePartsStyle({
  field: defineWithBaseFormOnAccentStyle({
    _active: {
      boxShadow: 'inset-on-accent',
    },
    _focus: {
      boxShadow: 'inset-on-accent',
    },
  }),
});

const filledStyle = definePartsStyle({
  field: {
    borderRadius: 'base',
    bg: 'bg.accent.muted',
    color: 'fg.accent.subtle',
    _hover: {
      bg: 'bg.accent.muted',
      borderColor: 'bg.accent.muted',
    },
    _active: {
      color: 'fg.accent.subtle',
    },
    _focus: {
      bg: 'unset',
      borderColor: 'fg.accent.default',
      boxShadow: 'none',
      color: 'fg.accent.subtle',
      _placeholder: {
        color: 'fg.accent.muted',
      },
    },
    _placeholder: {
      color: 'fg.accent.subtle',
    },
  },
});

const variants = {
  outline: outlineStyle,
  filled: filledStyle,
};

export const inputTheme = defineMultiStyleConfig({
  variants,
});
