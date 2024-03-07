import {IconType} from '@caredoc/ui-master'
import React, {FC, useCallback, useMemo, useState} from 'react'

import {
  RatingEventWrapper,
  RatingHover,
  RatingStar,
  RatingWrapper,
  Root,
} from './styles'
import {IRating} from './types'

const MAX_RATING = 5
const HALF = 0.5

const Rating: FC<React.PropsWithChildren<IRating>> = (props) => {
  const {
    value = 0,
    onChange,
    size = 'xs',
    readonly = false,
    disabled = false,
    color = 'y500',
    ...rest
  } = props
  const [isRating, setIsRating] = useState(false)
  const [ratingValue, setRatingValue] = useState(0)
  const starValue = useMemo(
    () => (isRating ? ratingValue : value),
    [isRating, ratingValue, value],
  )
  const stars = useMemo(
    () =>
      [...Array.from({length: MAX_RATING})].map((_, index): IconType => {
        if (starValue > index && starValue - index < 1) {
          return 'half-star'
        }

        return 'star'
      }),
    [starValue],
  )

  const handleOnMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      const {
        nativeEvent: {offsetX},
        currentTarget: {offsetWidth},
      } = event

      if (readonly || disabled) {
        return
      }

      const point = index + (offsetWidth / 2 > offsetX ? HALF : 1)

      setRatingValue(point)
    },
    [disabled, readonly],
  )

  const handleOnMouseEnter = useCallback(() => {
    if (readonly || disabled) {
      return
    }

    setIsRating(true)
  }, [disabled, readonly])

  const handleOnMouseLeave = useCallback(() => {
    if (readonly || disabled) {
      return
    }

    setIsRating(false)
  }, [disabled, readonly])

  const handleOnClick = useCallback(() => {
    !readonly && !disabled && onChange && onChange(ratingValue)
  }, [readonly, disabled, onChange, ratingValue])

  const renderStarsBg = useCallback(
    () => (
      <RatingWrapper flexDirection="row" isBg>
        {stars.map((_, index) => (
          <RatingHover
            key={`rating-star-bg-${index}`}
            onMouseMove={(event) => handleOnMouseMove(event, index)}
          >
            <RatingStar fill="n300" index={index} name="star" size={size} />
          </RatingHover>
        ))}
      </RatingWrapper>
    ),
    [handleOnMouseMove, size, stars],
  )

  const renderStars = useCallback(
    () => (
      <RatingWrapper flexDirection="row">
        {stars.map((icon, index) => (
          <RatingStar
            fill={starValue > index ? color : 'n300'}
            index={index}
            key={`rating-star-${index}`}
            name={icon as IconType}
            size={size}
          />
        ))}
      </RatingWrapper>
    ),
    [color, size, stars, starValue],
  )

  return (
    <RatingEventWrapper
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Root
        color={color}
        disabled={disabled}
        flexDirection="row"
        {...rest}
        {...(!readonly && !disabled && {onClick: handleOnClick})}
      >
        {renderStarsBg()}
        {renderStars()}
      </Root>
    </RatingEventWrapper>
  )
}

export default Rating
