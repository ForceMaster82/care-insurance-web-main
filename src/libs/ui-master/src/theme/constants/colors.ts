import {Colors, DefaultColors} from '../../types'

const colors: Colors = {
  n000: '#FFFFFF',

  n100: '#F6F6F6',

  n200: '#EEEEEE',

  n300: '#E2E2E2',

  n400: '#D3D2D2',

  n500: '#B6B3B3',

  n600: '#7D7878',

  n700: '#5B5555',

  n800: '#403D3D',
  // neutral
  n900: '#191919',

  r000: '#FFECE1',

  r100: '#FFCFB5',

  g800: '#5E7542',

  r200: '#FFB185',

  r300: '#FF9568',

  g400: '#A7C186',

  r400: '#FF8450',

  r500: '#EC5C2E',

  g600: '#799456',

  r600: '#C7450D',
  g000: '#F3FAEB',
  r700: '#9D2F00',
  r800: '#732200',
  b800: '#08287B',

  // red
  r900: '#521400',

  y000: '#FFF7DD',

  b600: '#285ADD',

  y200: '#FFDB77',

  b400: '#7192FB',

  y300: '#FFCF46',
  b000: '#F4F7FF',
  y400: '#FFC324',
  b200: '#C1D3FF',
  y600: '#FFA905',
  g200: '#C5E49F',
  y500: '#FFB90C',
  b100: '#D8E3FF',
  y800: '#A97D41',
  b300: '#9EB9FF',

  
b500: '#446DED',
  // Yellow
y900: '#88684F',
  b700: '#113FB6',
  y700: '#D28F34',
  // blue
  b900: '#141B4D',


e100: '#79D2A4',

  g300: '#B5D291',

  e200: '#46ADBB',
  
y100: '#FFE9AA',

  
e300: '#5B8DD7',

  // green
g900: '#485537',

  e400: '#9079BF',

  g700: '#6E874F',

  // eTC
  e500: '#8C8FAB',
  
  g100: '#D2F2AC',

  g500: '#90B066',

  kakao1: '#FFDC00',
  // kAKAO
  kakao2: '#3C1E1E',

  kb1: '#FBC31C',

  kb2: '#FCAF16',

  kb3: '#919191',

  kb4: '#776C61',
  // kB
  kb5: '#504C3F',
}

export default {
  ...colors,
  bgPrimary: colors.n000,
  bgSecondary: colors.n100,
  borderPrimary: colors.n100,
  borderSecondary: colors.n200,
  borderTertiary: colors.n300,
  disabled: colors.n200,
  fontPrimary: colors.n700,
  fontSecondary: colors.n600,
  fontTertiary: colors.n500,
  fontWhite: colors.n000,
  information: colors.b500,
  negative: colors.r500,
  positive: colors.g500,
  primary: colors.r400,
  primaryVariant: colors.r300,
  transparent: 'transparent',
  warning: colors.y500,
} as DefaultColors
