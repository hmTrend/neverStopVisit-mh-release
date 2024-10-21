import { theme as proTheme } from '@chakra-ui/pro-theme';
import { extendTheme } from '@chakra-ui/theme-utils';
import { components } from './components';
import * as foundations from './foundations';
import { styles } from './styles';

export const theme: Record<string, any> = extendTheme(proTheme, {
  styles,
  ...foundations,
  ...foundations.typography,
  colors: { ...foundations.colors, brand: foundations.colors['gray'] },
  components: {
    ...components,
  },
});
