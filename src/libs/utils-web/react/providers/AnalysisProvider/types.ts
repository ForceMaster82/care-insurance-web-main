export type TargetAction = 'visit' | 'click' | 'keypress'
export type Platform = 'none' | 'app' | 'web'
export type TargetType = 'page' | 'button' | 'inputbox'
export type Target = string
export type Namespace = string

// ref: https://www.notion.so/caredoc/_-_-666d8e672edc470e8037077fe06acf42#b945b50d07b94270b3f1bf5b600e9d2f
// 참고: https://toss.tech/article/template-literal-types
export type EventKeyTypeFormat =
  `${TargetAction}_${Platform}_${TargetType}_${Namespace}`
export type EventKeyTypeFormatWithTarget =
  `${TargetAction}_${Platform}_${TargetType}_${Namespace}_${Target}`

export type EventKeyType = EventKeyTypeFormat | EventKeyTypeFormatWithTarget

export type AnalysisChannel = 'mixpanel' | 'amplitude' | 'googleTagManager'

export interface Analysis {
  channels?: AnalysisChannel[]
  namespace?: string
  parameters?: Record<string, unknown>
  platform?: Platform
  target?: Target
  targetAction?: TargetAction
  targetType?: TargetType
}
