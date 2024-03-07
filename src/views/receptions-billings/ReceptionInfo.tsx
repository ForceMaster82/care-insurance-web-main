import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import Card from '../../components/Card'
import useReceptionDetail from '../../hooks/api/reception/use-reception-detail'
import {CLAIM_TYPE, SEX} from '../../constants'
import useCoverageDetail from '../../hooks/api/coverage/use-coverage-detail'
import {ReceptionBillingsModalType} from '../../types'
import CoverageDetailModal from '../../components/CoverageDetailModal'
import {formatDate} from '../../utils/date'

interface IProps {
  receptionId: string
}

const ReceptionInfo = (props: IProps): ReactElement => {
  const {receptionId} = props

  const modalStore = useModalStore<ReceptionBillingsModalType>()

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    suspense: true,
  })
  const coverageData = useCoverageDetail({
    coverageId: receptionData?.insuranceInfo.coverageId,
  })

  const handleOnClickCoverageDetail = (): void => {
    modalStore.create(
      'COVERAGE_DETAIL',
      <CoverageDetailModal
        coverageId={receptionData?.insuranceInfo.coverageId}
        onClickClose={(): void => modalStore.delete('COVERAGE_DETAIL')}
      />,
    )
  }

  return (
    <Box gap="xs">
      <Card>
        <Card.Header borderRadius="md" title="가입 정보" />
      </Card>
      <Card>
        <Card.Body borderRadius="md">
          <Card.RowGroup>
            <Card.Row>
              <Card.Item title="사고번호">
                {receptionData?.accidentInfo.accidentNumber}
              </Card.Item>
              <Card.Item title="증권번호">
                {receptionData?.insuranceInfo.insuranceNumber}
              </Card.Item>
              <Card.Item title="고객명">
                {receptionData?.patientInfo.name}
              </Card.Item>
              <Card.Item title="닉네임">
                {receptionData?.patientInfo.nickname}
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="만 나이 (세)">
                {receptionData?.patientInfo.age}
              </Card.Item>
              <Card.Item title="성별">
                {receptionData && SEX[receptionData.patientInfo.sex]}
              </Card.Item>
              <Card.Item title="청구유형">
                {receptionData &&
                  CLAIM_TYPE[receptionData.accidentInfo.claimType]}
              </Card.Item>
              <Card.Item title="청약일자">
                {receptionData &&
                  formatDate(receptionData.insuranceInfo.subscriptionDate)}
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Box flex={1} flexDirection="row" gap="md">
                <Card.Item
                  subButton={{
                    onClick: handleOnClickCoverageDetail,
                    text: '상세',
                  }}
                  title="가입담보"
                >
                  {coverageData?.name}
                </Card.Item>
                <Card.Item title="한도일">
                  {receptionData?.insuranceInfo.caregivingLimitPeriod}
                </Card.Item>
              </Box>
              <Box flex={1} flexDirection="row" gap="md">
                <Card.Item title="예상 한도일자">
                  {receptionData &&
                    formatDate(receptionData.expectedCaregivingLimitDate)}
                </Card.Item>
                <Box />
              </Box>
            </Card.Row>
          </Card.RowGroup>
        </Card.Body>
      </Card>
    </Box>
  )
}

export default ReceptionInfo
