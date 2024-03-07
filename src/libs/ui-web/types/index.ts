import {Analysis} from '@caredoc/utils-web'
import {CSSProperties as ReactCSSProperties} from 'react'
import {CSSProperties as SCCSSProperties} from 'styled-components'

export default interface IDefaultProps {
  analysis?: Analysis
  className?: string
  style?: ReactCSSProperties & SCCSSProperties
}
