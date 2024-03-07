import {FC, SVGProps} from 'react'
import {IconType} from './types'
import Icon24Hours from './components/24Hours'
import IconAdmissionOutlined from './components/AdmissionOutlined'
import IconAdmission from './components/Admission'
import IconAlertOutlined from './components/AlertOutlined'
import IconAlert from './components/Alert'
import IconArrowDown from './components/ArrowDown'
import IconArrowLeft from './components/ArrowLeft'
import IconArrowRight from './components/ArrowRight'
import IconArrowUp from './components/ArrowUp'
import IconBath from './components/Bath'
import IconBed from './components/Bed'
import IconBlind from './components/Blind'
import IconBrain from './components/Brain'
import IconCameraOutlined from './components/CameraOutlined'
import IconCamera from './components/Camera'
import IconCareOutlined from './components/CareOutlined'
import IconCareGuide from './components/CareGuide'
import IconCareJump from './components/CareJump'
import IconCareLab from './components/CareLab'
import IconCare from './components/Care'
import IconCareplus from './components/Careplus'
import IconChart from './components/Chart'
import IconChatOutlined from './components/ChatOutlined'
import IconChat from './components/Chat'
import IconCheckCircleFilled from './components/CheckCircleFilled'
import IconCheckCircleOutlined from './components/CheckCircleOutlined'
import IconCheck from './components/Check'
import IconChevronDown from './components/ChevronDown'
import IconChevronLeft from './components/ChevronLeft'
import IconChevronRight from './components/ChevronRight'
import IconChevronUp from './components/ChevronUp'
import IconCloseCircleOutlined from './components/CloseCircleOutlined'
import IconCloseCircle from './components/CloseCircle'
import IconClose from './components/Close'
import IconCoupon from './components/Coupon'
import IconCs from './components/Cs'
import IconCurrentLocationOutlined from './components/CurrentLocationOutlined'
import IconCurrentLocation from './components/CurrentLocation'
import IconDateSelect from './components/DateSelect'
import IconDaynightOutlined from './components/DaynightOutlined'
import IconDaynight from './components/Daynight'
import IconDisposition from './components/Disposition'
import IconEducation from './components/Education'
import IconFilterOutlined from './components/FilterOutlined'
import IconFilter from './components/Filter'
import IconGalleryOutlined from './components/GalleryOutlined'
import IconGallery from './components/Gallery'
import IconHalfStarOutlined from './components/HalfStarOutlined'
import IconHalfStar from './components/HalfStar'
import IconHeartOutlined from './components/HeartOutlined'
import IconHeart from './components/Heart'
import IconHelpOutlined from './components/HelpOutlined'
import IconHelp from './components/Help'
import IconHistory from './components/History'
import IconHomeOutlined from './components/HomeOutlined'
import IconHome from './components/Home'
import IconHospitalSymbolOutlined from './components/HospitalSymbolOutlined'
import IconHospitalSymbol from './components/HospitalSymbol'
import IconHospital from './components/Hospital'
import IconHowToGuide from './components/HowToGuide'
import IconIdcard from './components/Idcard'
import IconInquire from './components/Inquire'
import IconMapOutlined from './components/MapOutlined'
import IconMapPinOutlined from './components/MapPinOutlined'
import IconMapPin from './components/MapPin'
import IconMap from './components/Map'
import IconMenu from './components/Menu'
import IconMinus from './components/Minus'
import IconMore from './components/More'
import IconMyWork from './components/MyWork'
import IconNotice from './components/Notice'
import IconPaymentGuide from './components/PaymentGuide'
import IconPayment from './components/Payment'
import IconPersonOutlined from './components/PersonOutlined'
import IconPerson from './components/Person'
import IconPhoneOutlined from './components/PhoneOutlined'
import IconPhone from './components/Phone'
import IconPlayOutlined from './components/PlayOutlined'
import IconPlay from './components/Play'
import IconPlus from './components/Plus'
import IconPrivacyTerm from './components/PrivacyTerm'
import IconPromise from './components/Promise'
import IconPurchaseAccount from './components/PurchaseAccount'
import IconPurchaseCard from './components/PurchaseCard'
import IconPushalert from './components/Pushalert'
import IconSearchOutlined from './components/SearchOutlined'
import IconSearch from './components/Search'
import IconSettingOutlined from './components/SettingOutlined'
import IconSetting from './components/Setting'
import IconShortTimeOutlined from './components/ShortTimeOutlined'
import IconShortTime from './components/ShortTime'
import IconStarOutlined from './components/StarOutlined'
import IconStar from './components/Star'
import IconStatement from './components/Statement'
import IconTerms from './components/Terms'
import IconTransitionGuide from './components/TransitionGuide'
import IconUpdate from './components/Update'
import IconView from './components/View'
import IconVisitCare from './components/VisitCare'
import IconVisitNursing from './components/VisitNursing'
import IconWelfareToolOutlined from './components/WelfareToolOutlined'
import IconWelfareTool from './components/WelfareTool'
import IconWriteOutlined from './components/WriteOutlined'
import IconWrite from './components/Write'

export const icons = new Map<IconType, FC<SVGProps<SVGSVGElement>>>([
  ['24-hours', Icon24Hours],
  ['admission--outlined', IconAdmissionOutlined],
  ['admission', IconAdmission],
  ['alert--outlined', IconAlertOutlined],
  ['alert', IconAlert],
  ['arrow-down', IconArrowDown],
  ['arrow-left', IconArrowLeft],
  ['arrow-right', IconArrowRight],
  ['arrow-up', IconArrowUp],
  ['bath', IconBath],
  ['bed', IconBed],
  ['blind', IconBlind],
  ['brain', IconBrain],
  ['camera--outlined', IconCameraOutlined],
  ['camera', IconCamera],
  ['care--outlined', IconCareOutlined],
  ['care-guide', IconCareGuide],
  ['care-jump', IconCareJump],
  ['care-lab', IconCareLab],
  ['care', IconCare],
  ['careplus', IconCareplus],
  ['chart', IconChart],
  ['chat--outlined', IconChatOutlined],
  ['chat', IconChat],
  ['check-circle--filled', IconCheckCircleFilled],
  ['check-circle--outlined', IconCheckCircleOutlined],
  ['check', IconCheck],
  ['chevron-down', IconChevronDown],
  ['chevron-left', IconChevronLeft],
  ['chevron-right', IconChevronRight],
  ['chevron-up', IconChevronUp],
  ['close-circle--outlined', IconCloseCircleOutlined],
  ['close-circle', IconCloseCircle],
  ['close', IconClose],
  ['coupon', IconCoupon],
  ['cs', IconCs],
  ['current-location--outlined', IconCurrentLocationOutlined],
  ['current-location', IconCurrentLocation],
  ['date-select', IconDateSelect],
  ['daynight--outlined', IconDaynightOutlined],
  ['daynight', IconDaynight],
  ['disposition', IconDisposition],
  ['education', IconEducation],
  ['filter--outlined', IconFilterOutlined],
  ['filter', IconFilter],
  ['gallery--outlined', IconGalleryOutlined],
  ['gallery', IconGallery],
  ['half-star--outlined', IconHalfStarOutlined],
  ['half-star', IconHalfStar],
  ['heart--outlined', IconHeartOutlined],
  ['heart', IconHeart],
  ['help--outlined', IconHelpOutlined],
  ['help', IconHelp],
  ['history', IconHistory],
  ['home--outlined', IconHomeOutlined],
  ['home', IconHome],
  ['hospital-symbol--outlined', IconHospitalSymbolOutlined],
  ['hospital-symbol', IconHospitalSymbol],
  ['hospital', IconHospital],
  ['how-to-guide', IconHowToGuide],
  ['idcard', IconIdcard],
  ['inquire', IconInquire],
  ['map--outlined', IconMapOutlined],
  ['map-pin--outlined', IconMapPinOutlined],
  ['map-pin', IconMapPin],
  ['map', IconMap],
  ['menu', IconMenu],
  ['minus', IconMinus],
  ['more', IconMore],
  ['my-work', IconMyWork],
  ['notice', IconNotice],
  ['payment-guide', IconPaymentGuide],
  ['payment', IconPayment],
  ['person--outlined', IconPersonOutlined],
  ['person', IconPerson],
  ['phone--outlined', IconPhoneOutlined],
  ['phone', IconPhone],
  ['play--outlined', IconPlayOutlined],
  ['play', IconPlay],
  ['plus', IconPlus],
  ['privacy-term', IconPrivacyTerm],
  ['promise', IconPromise],
  ['purchase-account', IconPurchaseAccount],
  ['purchase-card', IconPurchaseCard],
  ['pushalert', IconPushalert],
  ['search--outlined', IconSearchOutlined],
  ['search', IconSearch],
  ['setting--outlined', IconSettingOutlined],
  ['setting', IconSetting],
  ['short-time--outlined', IconShortTimeOutlined],
  ['short-time', IconShortTime],
  ['star--outlined', IconStarOutlined],
  ['star', IconStar],
  ['statement', IconStatement],
  ['terms', IconTerms],
  ['transition-guide', IconTransitionGuide],
  ['update', IconUpdate],
  ['view', IconView],
  ['visit-care', IconVisitCare],
  ['visit-nursing', IconVisitNursing],
  ['welfare-tool--outlined', IconWelfareToolOutlined],
  ['welfare-tool', IconWelfareTool],
  ['write--outlined', IconWriteOutlined],
  ['write', IconWrite],
])

export {type IconType} from './types'
