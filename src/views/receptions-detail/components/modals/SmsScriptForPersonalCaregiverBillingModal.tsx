/* eslint-disable no-alert */
import React, {ReactElement} from 'react'
import {Box, Typography} from '@caredoc/ui-web'
import {differenceInCalendarDays} from 'date-fns'
import Modal from '../../../../components/Modal'
import useCoverageDetail from '../../../../hooks/api/coverage/use-coverage-detail'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import CoverageResource from '../../../../models/dto/coverage/Resource'
import ReceptionResource from '../../../../models/dto/reception/Resource'
import {ICoverageAnnualCoveredCaregivingCharges} from '../../../../types/dto'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const sortTargetAccidentYearDesc = (
  a: ICoverageAnnualCoveredCaregivingCharges,
  b: ICoverageAnnualCoveredCaregivingCharges,
): number => {
  if (a.targetAccidentYear > b.targetAccidentYear) {
    return -1
  }
  if (a.targetAccidentYear < b.targetAccidentYear) {
    return 1
  }
  return 0
}

const getDailyCaregivingChargeInRealtime = (
  receptionData: ReceptionResource,
  coverageData: CoverageResource,
): number | null => {
  const subscriptionDate = receptionData.insuranceInfo.subscriptionDate

  return (
    coverageData.annualCoveredCaregivingCharges
      .sort(sortTargetAccidentYearDesc)
      .map((item) => ({
        ...item,
        subscriptionRenewalDate: new Date(
          item.targetAccidentYear,
          subscriptionDate.getMonth(),
          subscriptionDate.getDate(),
        ),
      }))
      .find(
        (item) =>
          differenceInCalendarDays(Date.now(), item.subscriptionRenewalDate) >
          0,
      )?.caregivingCharge || null
  )
}

const SmsScriptForPersonalCaregiverBillingModal = (
  props: IProps,
): ReactElement | null => {
  const {onClickClose, receptionId} = props

  const {data} = useReceptionDetail({receptionId})

  const coverage = useCoverageDetail({
    coverageId: data?.insuranceInfo.coverageId,
  })
  const dailyCaregivingChargeInRealtime =
    data && coverage ? getDailyCaregivingChargeInRealtime(data, coverage) : null

  if (!data || !dailyCaregivingChargeInRealtime) {
    return null
  }

  const {
    accidentInfo: {accidentNumber},
  } = data

  const scriptText = `고객님 안녕하세요.\n메리츠화재 간병업체 케어닥 입니다.\n개인구인 간병인 이용 후 청구 방법 안내드립니다.\n\n★ 주의사항\n간병인은 협회에 소속된 간병인만 보험금 청구가 가능합니다.\n간병비는 24시간 기준 최대 ${formatStaticNumberWithComma(
    dailyCaregivingChargeInRealtime,
  )}원 입니다.\n\n★ 구비서류\n1. 간병인 임금 입금 내역서\n2. 간병인 영수증 (협회 사업자 번호와 간병사 사용기간 기재 필수)\n3. 협회 사업자등록증\n모든 서류 상단에 [사고번호 ${accidentNumber}] 작성해 주시면 더욱 빠른 처리가 가능합니다.\n\n구비 서류는 메리츠화재(fax: 0505-021-3400)로 발송 부탁드리며, 세 가지 외 추가 필요한 서류(진단서, 입・퇴원 확인서 등)는 제출 요청 드릴 수 있습니다.\n감사합니다.\n\n메리츠화재 고객센터: 1566-7711`

  const handleOnClickScriptText = (): void => {
    navigator.clipboard
      .writeText(scriptText)
      .then(() => alert('복사되었습니다.'))
      .catch(() => alert('오류가 발생하여 복사를 할 수 없습니다.'))
  }

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="sm"
      onClose={onClickClose}
      title="고객 발송 스크립트"
    >
      <Box
        backgroundColor="bgPrimary"
        borderRadius="md"
        elevation="elevation-1"
        my="xxs"
        onClick={handleOnClickScriptText}
        p="sm"
        variant="shadow"
      >
        <Typography>{scriptText}</Typography>
      </Box>
    </Modal>
  )
}

export default SmsScriptForPersonalCaregiverBillingModal
