import {Box, Button, InfoBox, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import Card from '../../../components/Card'
import {ReceptionDetailModalType} from '../../../types'
import useReceptionCaregivingRoundList from '../../../hooks/api/caregiving-round/use-reception-caregiving-round-list'
import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import {formatDate} from '../../../utils/date'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'
import ExpectedCaregivingStartDateUpdateModal from './modals/ExpectedCaregivingStartDateUpdateModal'
import CaregivingRoundModification from './CaregivingRoundModification'
import CaregivingInfoHistoryModal from './modals/CaregivingInfoHistoryModal'
import CaregivingRoundInfo from './CaregivingRoundInfo'

interface IProps {
  receptionId: string
}

const CaregivingInfo = (props: IProps): ReactElement => {
  const {receptionId} = props

  const modalStore = useModalStore<ReceptionDetailModalType>()

  const {data: receptionData} = useReceptionDetail({receptionId})
  const caregivingRoundsData = useReceptionCaregivingRoundList({receptionId})

  const isInternalManager = Boolean(getInternalCaregivingManagerIdFromToken())

  const handleOnClickCaregivingRoundModificationHistory = (): void =>
    modalStore.create(
      'CAREGIVING_INFO_HISTORY',
      <CaregivingInfoHistoryModal
        onClickClose={(): void => modalStore.delete('CAREGIVING_INFO_HISTORY')}
        receptionId={receptionId}
      />,
    )

  const handleOnClickExpectedCaregivingStartDateUpdate = (): void => {
    modalStore.create(
      'EXPECTED_CAREGIVING_START_DATE_UPDATE',
      <ExpectedCaregivingStartDateUpdateModal
        onClickCloseButton={(): void =>
          modalStore.delete('EXPECTED_CAREGIVING_START_DATE_UPDATE')
        }
        receptionId={receptionId}
      />,
    )
  }

  return (
    <Box gap="xs">
      <Card>
        <Card.Header
          borderRadius="md"
          leftSide={
            <Box alignItems="center" flexDirection="row" gap="xs">
              <Box flexDirection="row" gap="xxs">
                <Typography variant="caption2">간병 예상일자:</Typography>
                <Typography variant="caption1">
                  {(receptionData?.expectedCaregivingStartDate &&
                    formatDate(receptionData.expectedCaregivingStartDate)) ||
                    '없음'}
                </Typography>
              </Box>
              <Button
                color="primary"
                onClick={handleOnClickExpectedCaregivingStartDateUpdate}
                size="xs"
                variant="secondary"
              >
                수정
              </Button>
            </Box>
          }
          rightSide={
            isInternalManager ? (
              <CaregivingRoundModification
                onClick={handleOnClickCaregivingRoundModificationHistory}
                receptionId={receptionId}
              />
            ) : null
          }
          title="간병 정보"
        />
      </Card>
      {receptionData &&
        caregivingRoundsData?.map(
          (caregivingRoundData, index, caregivingRoundList) => (
            <CaregivingRoundInfo
              data={caregivingRoundData}
              key={`caregiving-round-item-${caregivingRoundData.id}`}
              previousRoundClosingReasonType={
                index <= caregivingRoundList.length - 2
                  ? caregivingRoundList[index + 1]
                      .caregivingRoundClosingReasonType
                  : null
              }
              receptionProgressingStatus={receptionData.progressingStatus}
            />
          ),
        )}
      {caregivingRoundsData?.length === 0 && (
        <InfoBox size="md" state="warning">
          간병 회차가 존재하지 않습니다.
        </InfoBox>
      )}
    </Box>
  )
}

export default CaregivingInfo
