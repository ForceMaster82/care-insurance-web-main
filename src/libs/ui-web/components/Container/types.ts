import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
export interface IContainer
  extends IDefaultProps,
    Pick<IBox, 'py' | 'pt' | 'pb' | 'gap'> {
  fluid?: boolean
}

export interface IContainerRoot extends IContainer {}
