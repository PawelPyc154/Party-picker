import { dark } from '../theme/colors';
import { font } from '../theme/font';
import { zIndex } from '../theme/zIndex';
import { mq } from '../theme/mediaQueries';

const theme = { colors: dark, font, zIndex, mq };
type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
