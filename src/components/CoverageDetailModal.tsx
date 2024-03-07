import React, {ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import {Loading} from '@caredoc/templates-web'
import useCoverageDetail from '../hooks/api/coverage/use-coverage-detail'
import {COVERAGE_RENEWAL_TYPE} from '../constants'
import {formatStaticNumberWithComma} from '../utils/formatter'
import Td from './table/Td'
import Th from './table/Th'
import Modal from './Modal'

interface IProps {
  coverageId?: string | null
  onClickClose: () => void
}

const CoverageDetailModal = (props: IProps): ReactElement => {
  const {onClickClose, coverageId} = props

  const data = useCoverageDetail({coverageId})
  const caregivingChargeList =
    data?.annualCoveredCaregivingCharges.filter(
      (item) => item.caregivingCharge,
    ) || []

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="md"
      onClose={onClickClose}
      title="가입담보 정보"
    >
      {(data && (
        <Box gap="md">
          {/** table 1 */}
          <Box gap="xxs">
            <Box flexDirection="row" gap="xxs">
              <Th flex={1}>가입담보명</Th>
              <Th flex={1}>구분</Th>
              <Th flex={1}>기준연도</Th>
            </Box>
            <Box flexDirection="row" gap="xxs">
              <Td flex={1}>{data.name}</Td>
              <Td flex={1}>{COVERAGE_RENEWAL_TYPE[data.renewalType]}</Td>
              <Td flex={1}>{data.targetSubscriptionYear}</Td>
            </Box>
          </Box>
          {/** table 2 */}
          <Box gap="xxs">
            <Box flexDirection="row" gap="xxs">
              <Th flex={1}>번호</Th>
              <Th flex={1}>적용연도</Th>
              <Th flex={1}>일일 간병비</Th>
            </Box>
            {caregivingChargeList.map((item, index, list) => (
              <Box
                flexDirection="row"
                gap="xxs"
                key={`${data.id}-annual-covered-caregiving-charge-item-${item.targetAccidentYear}`}
              >
                <Td flex={1}>{list.length - index}</Td>
                <Td flex={1}>{item.targetAccidentYear}</Td>
                <Td flex={1}>
                  {formatStaticNumberWithComma(item.caregivingCharge)}
                </Td>
              </Box>
            ))}
          </Box>
        </Box>
      )) || <Loading />}
    </Modal>
  )
}

export default CoverageDetailModal
