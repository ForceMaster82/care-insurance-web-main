import React, {FC} from 'react'
import {ChipIcon, ChipText, Root} from './styles'
import {IChip} from './types'

/**
 * variant warning
 * - solid, two-tone, outline are deprecated use primary, secondary, tertiary
 *
 * color alias (color)
 * - primary: r400
 * - primaryVariant: r300
 * - positive: g500
 * - negative: r500
 * - warning: y500
 * - information: b500
 */
const Chip: FC<React.PropsWithChildren<IChip>> = (props) => {
  const {
    analysis,
    children,
    disabled,
    color = 'primaryVariant',
    icon,
    size = 'xs',
    variant = 'primary',
    onClick,
  } = props

  return (
    <Root
      alignItems="center"
      analysis={analysis}
      borderColor={color}
      borderRadius="size6"
      chipVariant={variant}
      color={color}
      disabled={disabled}
      flexDirection="row"
      gap="xs"
      justifyContent="center"
      onClick={onClick}
      opacityBorderColor={color}
      size={size}
      variant="outlined"
    >
      {Boolean(icon) && (
        <ChipIcon
          chipVariant={variant}
          fill={color}
          name={icon || 'check'}
          size={size}
        />
      )}
      {Boolean(children) && (
        <ChipText chipVariant={variant} size={size} textColor={color}>
          {children}
        </ChipText>
      )}
    </Root>
  )
}

export default Chip
