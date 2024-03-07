/* eslint-disable no-alert */
import React, {ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import {useModalStore} from '@caredoc/utils-web'
import {useQueryClient} from '@tanstack/react-query'
import {SubmitErrorHandler, SubmitHandler} from 'react-hook-form'
import Card from '../../../../components/Card'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import CaregivingStatusChip from '../../../../components/chips/CaregivingStatusChip'
import SettlementStatusChip from '../../../../components/chips/SettlementStatusChip'
import BillingStatusChip from '../../../../components/chips/BillingStatusChip'
import useReadWriteMode from '../../../../hooks/use-read-write-mode'
import {
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  ReceptionDetailModalType,
  ReceptionProgressingStatus,
} from '../../../../types'
import CaregivingStartModal from '../modals/CaregivingStartModal'
import CaregivingCancelWhileRematchingModal from '../modals/CaregivingCancelWhileRematchingModal'
import CaregivingCompleteModal from '../modals/CaregivingCompleteModal'
import CaregivingStopModal from '../modals/CaregivingStopModal'
import CaregivingChargeEstimateModal from '../../../../components/CaregivingChargeEstimateModal'
import ReceptionCaregivingRoundInput from '../../../../models/dto/reception-caregiving-round/Input'
import useCaregivingRoundUpdate from '../../../../hooks/api/caregiving-round/use-caregiving-round-update'
import {ReceptionCaregivingRoundData} from '../../../../types/form'
import {getFirstFormError} from '../../../../utils/form'
import {getInternalCaregivingManagerIdFromToken} from '../../../../utils/manage-token'
import CaregivingRoundInfoContent from './Content'
import CaregivingRoundInfoInternalManagerForm from './InternalManagerForm'
import CaregivingRoundInfoExternalManagerForm from './ExternalManagerForm'

interface IProps {
  data: ReceptionCaregivingRoundResource
  previousRoundClosingReasonType: CaregivingRoundClosingReasonType | null
  receptionProgressingStatus: ReceptionProgressingStatus
}

const CaregivingRoundInfo = (props: IProps): ReactElement => {
  const {data, receptionProgressingStatus, previousRoundClosingReasonType} =
    props

  const modalStore = useModalStore<ReceptionDetailModalType>()
  const {mode, setMode} = useReadWriteMode()

  const {mutate: updateCaregivingRound} = useCaregivingRoundUpdate()

  const queryClient = useQueryClient()

  const isInternalManager = Boolean(getInternalCaregivingManagerIdFromToken())

  const isCaregivingRoundCompleted =
    data.caregivingProgressingStatus === 'COMPLETED' ||
    data.caregivingProgressingStatus === 'COMPLETED_USING_PERSONAL_CAREGIVER' ||
    data.caregivingProgressingStatus === 'RECONCILIATION_COMPLETED'

  const handleOnClickStart = (): void => {
    modalStore.create(
      'CAREGIVING_START',
      <CaregivingStartModal
        caregivingRoundResource={data}
        onClickClose={(): void => modalStore.delete('CAREGIVING_START')}
      />,
    )
  }

  const handleOnClickCancelWhileRematching = (): void => {
    modalStore.create(
      'CAREGIVING_CANCEL_WHILE_REMATCHING',
      <CaregivingCancelWhileRematchingModal
        caregivingRoundResource={data}
        onClickClose={(): void =>
          modalStore.delete('CAREGIVING_CANCEL_WHILE_REMATCHING')
        }
      />,
    )
  }

  const handleOnClickComplete = (): void => {
    modalStore.create(
      'CAREGIVING_COMPLETE',
      <CaregivingCompleteModal
        caregivingRoundResource={data}
        onClickClose={(): void => modalStore.delete('CAREGIVING_COMPLETE')}
      />,
    )
  }

  const handleOnClickCompleteAndRestart = (): void => {
    modalStore.create(
      'CAREGIVING_STOP',
      <CaregivingStopModal
        caregivingRoundResource={data}
        onClickClose={(): void => modalStore.delete('CAREGIVING_STOP')}
      />,
    )
  }

  const handleOnClickEstimateCaregivingCharge = (): void => {
    modalStore.create(
      'CAREGIVING_CHARGE_ESTIMATE',
      <CaregivingChargeEstimateModal
        caregivingRoundId={data.id}
        onClickClose={(): void =>
          modalStore.delete('CAREGIVING_CHARGE_ESTIMATE')
        }
      />,
    )
  }

  const handleOnClickPendingRematching = (): void => {
    const pendingRematchingRequested = confirm('리매칭 보류 처리하시겠습니까?')

    if (!pendingRematchingRequested) {
      return
    }

    const caregivingRoundInput = new ReceptionCaregivingRoundInput(data)
    caregivingRoundInput.caregivingProgressingStatus = 'PENDING_REMATCHING'

    updateCaregivingRound(
      {
        pathParams: {caregivingRoundId: data.id},
        payload: caregivingRoundInput.input,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'reception-caregiving-round',
              'list',
              {receptionId: data.receptionInfo.receptionId},
            ],
          })
        },
      },
    )
  }

  const handleOnSubmit: SubmitHandler<ReceptionCaregivingRoundData> = (
    formData,
  ) => {
    const nextProgressingStatus: CaregivingProgressingStatus =
      data.caregivingRoundNumber !== 1 &&
      data.caregivingProgressingStatus === 'NOT_STARTED' &&
      !data.caregiverInfo
        ? 'REMATCHING'
        : data.caregivingProgressingStatus

    const updateInput = new ReceptionCaregivingRoundInput()
    updateInput.data = {
      ...formData,
      caregivingProgressingStatus: nextProgressingStatus,
    }

    updateCaregivingRound(
      {
        pathParams: {caregivingRoundId: data.id},
        payload: updateInput.input,
      },
      {
        onSuccess: () => {
          !data.caregiverInfo &&
            queryClient.invalidateQueries({
              queryKey: [
                'reception',
                'detail',
                {id: data.receptionInfo.receptionId},
              ],
            })
          queryClient.invalidateQueries({
            queryKey: [
              'reception-caregiving-round',
              'list',
              {receptionId: data.receptionInfo.receptionId},
            ],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'reception-caregiving-round-modification',
              {receptionId: data.receptionInfo.receptionId},
            ],
          })

          setMode('READ')
        },
      },
    )
  }

  const handleOnSubmitError: SubmitErrorHandler<
    ReceptionCaregivingRoundData
  > = (errors) => {
    const firstError = getFirstFormError(errors)

    if (firstError?.message) {
      alert(firstError.message)
    }
    if (firstError?.ref?.focus) {
      firstError.ref.focus()
    }
  }

  return (
    <Card>
      <Card.Header
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        leftSide={
          <Box flexDirection="row" gap="xxs">
            <CaregivingStatusChip status={data.caregivingProgressingStatus} />
            {isCaregivingRoundCompleted && (
              <>
                <SettlementStatusChip
                  status={data.settlementProgressingStatus}
                />
                <BillingStatusChip status={data.billingProgressingStatus} />
              </>
            )}
          </Box>
        }
        title={`${data.caregivingRoundNumber}회차`}
      />
      <Card.Body borderBottomLeftRadius="md" borderBottomRightRadius="md">
        {mode === 'READ' ? (
          <CaregivingRoundInfoContent
            data={data}
            onClickCancelWhileRematching={handleOnClickCancelWhileRematching}
            onClickComplete={handleOnClickComplete}
            onClickCompleteAndRestart={handleOnClickCompleteAndRestart}
            onClickEstimateCaregivingCharge={
              handleOnClickEstimateCaregivingCharge
            }
            onClickModify={(): void => setMode('WRITE')}
            onClickPendingRematching={handleOnClickPendingRematching}
            onClickStart={handleOnClickStart}
            receptionProgressingStatus={receptionProgressingStatus}
          />
        ) : isInternalManager ? (
          <CaregivingRoundInfoInternalManagerForm
            data={data}
            onClickCancelModify={(): void => setMode('READ')}
            onInvalid={handleOnSubmitError}
            onValid={handleOnSubmit}
            previousRoundClosingReasonType={previousRoundClosingReasonType}
          />
        ) : (
          <CaregivingRoundInfoExternalManagerForm
            data={data}
            onClickCancelModify={(): void => setMode('READ')}
            onInvalid={handleOnSubmitError}
            onValid={handleOnSubmit}
            previousRoundClosingReasonType={previousRoundClosingReasonType}
          />
        )}
      </Card.Body>
    </Card>
  )
}

export default CaregivingRoundInfo
