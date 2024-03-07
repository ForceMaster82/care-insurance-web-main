import {HeightProps, WidthProps} from 'styled-system'
import {ImageProps as NextImageProps} from 'next/legacy/image'
import {IBox} from '../Box/types'

export interface IImage extends WidthProps, HeightProps {
  containerProps?: IBox
  src: string
}
export interface IStaticImage
  extends Pick<NextImageProps, 'objectFit' | 'src' | 'loading' | 'layout'>,
    WidthProps,
    HeightProps {
  containerProps?: IBox
  src: string
}
