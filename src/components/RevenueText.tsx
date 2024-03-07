import {Colors, CustomColorKey} from '@caredoc/ui-master'
import {ITypography, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement, useMemo} from 'react'
import {formatStaticNumberWithComma} from '../utils/formatter'

interface IProps extends ITypography {
  children: number
}

const RevenueText = (props: PropsWithChildren<IProps>): ReactElement => {
  const {children: revenue, ...rest} = props

  const revenueTextColor = useMemo<keyof Colors | CustomColorKey>(() => {
    if (revenue > 0) {
      return 'g600'
    }
    if (revenue < 0) {
      return 'negative'
    }
    return 'fontPrimary'
  }, [revenue])

  return (
    <Typography textColor={revenueTextColor} variant="body4" {...rest}>
      {formatStaticNumberWithComma(revenue)}
    </Typography>
  )
}
export default RevenueText
