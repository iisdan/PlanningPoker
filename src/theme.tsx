export type sizingCode = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type colors = 'primary' | 'secondary' | 'accent';

export const theme = {
  textSizes: {
    xs: 12,
    s: 16,
    m: 20,
    l: 24,
    xl: 30,
    xxl: 34
  },
  spacing: {
    xs: 8,
    s: 14,
    m: 24,
    l: 30,
    xl: 34,
    xxl: 38,
  },
  colors: {
    primary: '#ffffff',
    secondary: 'rgba(255,255,255,0.5)',
    accent: '#29c78a',
  },
  deviceMaxWidths: {
    tablet: 1000,
    mobile: 750,
  }
}