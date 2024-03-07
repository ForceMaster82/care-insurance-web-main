import React, {FC} from 'react'
import NextImage, {ImageProps as NextImageProps} from 'next/image'
import Box from '../Box'
import {IImage, IStaticImage} from './types'
import {StaticImageRoot} from './styles'

export const Image: FC<React.PropsWithChildren<IImage & NextImageProps>> = (
  props,
) => {
  const {containerProps, alt = '', ...rest} = props
  const {objectFit, width, height} = props

  const renderImg = () => <NextImage alt={alt} {...rest} />

  const renderImgWrapper = () => {
    if (objectFit !== 'cover') {
      return (
        <Box height={height} width={width}>
          {renderImg()}
        </Box>
      )
    }

    return renderImg()
  }

  if (objectFit !== 'cover') {
    return (
      <Box position="relative" {...containerProps}>
        {renderImgWrapper()}
      </Box>
    )
  }

  return (
    <Box position="relative" {...containerProps}>
      {renderImg()}
    </Box>
  )
}
export const StaticImage: FC<React.PropsWithChildren<IStaticImage>> = ({
  src,
  containerProps,
  objectFit,
  width,
  height,
}) => {
  const renderImg = () => (
    <img height="100%" src={src} style={{objectFit}} width="100%" />
  )

  const renderImgWrapper = () => {
    if (objectFit !== 'cover') {
      return (
        <Box height={height} width={width}>
          {renderImg()}
        </Box>
      )
    }

    return renderImg()
  }

  return (
    <StaticImageRoot position="relative" {...containerProps}>
      {renderImgWrapper()}
    </StaticImageRoot>
  )
}

export default StaticImage
