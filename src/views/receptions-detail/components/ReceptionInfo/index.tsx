/* eslint-disable no-alert */
import {Box, Chip} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {useModalStore} from '@caredoc/utils-web'
import {SubmitErrorHandler, SubmitHandler} from 'react-hook-form'
import Card from '../../../../components/Card'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import ReceptionStatusChip from '../../../../components/chips/ReceptionStatusChip'
import useReadWriteMode from '../../../../hooks/use-read-write-mode'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import useReceptionUpdate from '../../../../hooks/api/reception/use-reception-update'
import {ReceptionDetailModalType} from '../../../../types'
import {getFirstFormError} from '../../../../utils/form'
import {ReceptionUpdateData} from '../../../../types/form'
import ReceptionModification from '../ReceptionModification'
import ReceptionCancelModal from '../modals/ReceptionCancelModal'
import CaregivingManagerAssignModal from '../modals/CaregivingManagerAssignModal'
import ReceptionCancelWhileMatchingModal from '../modals/ReceptionCancelWhileMatchingModal'
import ReceptionInfoHistoryModal from '../modals/ReceptionInfoHistoryModal'
import {getInternalCaregivingManagerIdFromToken} from '../../../../utils/manage-token'
import useReceptionApplicationCreate from '../../../../hooks/api/reception/use-reception-application-create'
import useReceptionApplication from '../../../../hooks/api/reception/use-reception-application'
import useReceptionApplicationDelete from '../../../../hooks/api/reception/use-reception-application-delete'
import UrgencyChip from '../../../../components/chips/UrgencyChip'
import PeriodTypeChip from '../../../../components/chips/PeriodTypeChip'
import ReceptionInfoInternalManagerForm from './InternalManagerForm'
import ReceptionInfoContent from './Content'
import ReceptionInfoExternalManagerForm from './ExternalManagerForm'

interface IProps {
  receptionId: string
}

const ReceptionInfo = (props: IProps): ReactElement | null => {
  const {receptionId} = props

  const {mode, setMode} = useReadWriteMode()
  const modalStore = useModalStore<ReceptionDetailModalType>()

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    suspense: true,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {mutate: updateReception} = useReceptionUpdate()
  const {
    data: applicationFile,
    isError: isApplicationFileFetchError,
    refetch: refetchApplicationFile,
  } = useReceptionApplication({receptionId})
  const {mutate: uploadApplicationFile} = useReceptionApplicationCreate()
  const {mutate: deleteApplicationFile} = useReceptionApplicationDelete()

  const queryClient = useQueryClient()

  const isInternalManager = Boolean(getInternalCaregivingManagerIdFromToken())

  const handleOnClickPending = async (): Promise<void> => {
    const pendingRequested = confirm('보류 처리하시겠습니까?')

    if (pendingRequested && receptionData) {
      const updateInput = new ReceptionUpdateInput(receptionData)
      updateInput.progressingStatus = 'PENDING'

      updateReception(
        {
          pathParams: {receptionId: receptionData.id},
          payload: updateInput.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['reception', 'detail', {id: receptionData.id}],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'reception-modification',
                {receptionId: receptionData.id},
              ],
            })
          },
        },
      )
    }
  }

  const handleOnClickCancel = (): void => {
    receptionData &&
      modalStore.create(
        'RECEPTION_CANCEL',
        <ReceptionCancelModal
          onClickClose={(): void => modalStore.delete('RECEPTION_CANCEL')}
          receptionId={receptionData.id}
        />,
      )
  }

  const handleOnClickCaregivingManagerAssign = (): void =>
    receptionData &&
    modalStore.create(
      'CAREGIVING_MANAGER_ASSIGN',
      <CaregivingManagerAssignModal
        onClickClose={(): void =>
          modalStore.delete('CAREGIVING_MANAGER_ASSIGN')
        }
        receptionId={receptionData.id}
      />,
    )

  const handleOnClickPendingMatching = async (): Promise<void> => {
    const pendingMatchingRequested = confirm('매칭 보류 처리하시겠습니까?')

    if (pendingMatchingRequested && receptionData) {
      const updateInput = new ReceptionUpdateInput(receptionData)
      updateInput.progressingStatus = 'PENDING_MATCHING'

      updateReception(
        {
          pathParams: {receptionId: receptionData.id},
          payload: updateInput.input,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries({
              queryKey: ['reception', 'detail', {id: receptionData.id}],
            })
          },
        },
      )
    }
  }

  const handleOnClickCancelWhileMathcing = (): void =>
    receptionData &&
    modalStore.create(
      'RECEPTION_CANCEL_WHILE_MATCHING',
      <ReceptionCancelWhileMatchingModal
        onClickClose={(): void =>
          modalStore.delete('RECEPTION_CANCEL_WHILE_MATCHING')
        }
        receptionId={receptionData.id}
      />,
    )

  const handleOnClickModificationHistory = (): void =>
    receptionData &&
    modalStore.create(
      'RECEPTION_INFO_HISTORY',
      <ReceptionInfoHistoryModal
        onClickClose={(): void => modalStore.delete('RECEPTION_INFO_HISTORY')}
        receptionId={receptionData.id}
      />,
    )

  const handleOnSubmit =
    (
      applicationFile?: File | null,
      deleteApplicationFileRequested?: boolean,
    ): SubmitHandler<ReceptionUpdateData> =>
    (data) => {
      if (!receptionData) {
        return
      }

      const updateInput = new ReceptionUpdateInput()
      updateInput.data = data

      updateReception(
        {
          pathParams: {receptionId: receptionData.id},
          payload: updateInput.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['reception', 'detail', {id: receptionData.id}],
            })
            queryClient.invalidateQueries({
              queryKey: ['reception-modification', {receptionId}],
            })

            if (applicationFile) {
              const formData = new FormData()

              formData.append(
                'reception-application-file',
                applicationFile,
                applicationFile.name,
              )

              uploadApplicationFile(
                {
                  pathParams: {receptionId: receptionData.id},
                  payload: formData,
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['reception-modification', {receptionId}],
                    })
                  },
                },
              )
            }

            if (deleteApplicationFileRequested) {
              deleteApplicationFile(
                {
                  pathParams: {
                    receptionId: receptionData.id,
                  },
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['reception-application', {receptionId}],
                    })
                    queryClient.invalidateQueries({
                      queryKey: ['reception-modification', {receptionId}],
                    })
                  },
                },
              )
            }

            setMode('READ')
          },
        },
      )
    }

  const handleOnSubmitError: SubmitErrorHandler<ReceptionUpdateData> = (
    errors,
  ) => {
    const firstError = getFirstFormError(errors)

    if (firstError?.message) {
      alert(firstError.message)
    }
    if (firstError?.ref?.focus) {
      firstError.ref.focus()
    }
  }

  if (!receptionData) {
    return null
  }

  return (
    <Box gap="xs">
      <Card>
        <Card.Header
          borderRadius="md"
          leftSide={
            <Box flexDirection="row" gap="xxs">
              <ReceptionStatusChip status={receptionData.progressingStatus} />
              <UrgencyChip
                renderOnly={['URGENT']}
                size="md"
                value={receptionData.urgency}
              />
              <PeriodTypeChip
                renderOnly={['SHORT']}
                size="md"
                value={receptionData.periodType}
              />
              {receptionData.urgency === 'NORMAL' &&
                receptionData.periodType === 'NORMAL' && (
                  <Chip color="fontPrimary" size="md" variant="secondary">
                    일반
                  </Chip>
                )}
            </Box>
          }
          rightSide={
            isInternalManager ? (
              <ReceptionModification
                onClick={handleOnClickModificationHistory}
                receptionId={receptionId}
              />
            ) : null
          }
          title="접수 정보"
        />
      </Card>
      <Card>
        <Card.Body borderRadius="md">
          {mode === 'READ' ? (
            <ReceptionInfoContent
              applicationFile={
                isApplicationFileFetchError ? null : applicationFile
              }
              data={receptionData}
              onClickCancel={handleOnClickCancel}
              onClickCancelWhileMatching={handleOnClickCancelWhileMathcing}
              onClickCaregivingManagerAssign={
                handleOnClickCaregivingManagerAssign
              }
              onClickModify={(): void => setMode('WRITE')}
              onClickPending={handleOnClickPending}
              onClickPendingMatcing={handleOnClickPendingMatching}
              refetchApplicationFile={refetchApplicationFile}
            />
          ) : isInternalManager ? (
            <ReceptionInfoInternalManagerForm
              data={receptionData}
              existingApplicationFile={applicationFile}
              onClickCancelModify={(): void => setMode('READ')}
              onInvalid={handleOnSubmitError}
              onValid={handleOnSubmit}
            />
          ) : (
            <ReceptionInfoExternalManagerForm
              data={receptionData}
              existingApplicationFile={applicationFile}
              onClickCancelModify={(): void => setMode('READ')}
              onInvalid={handleOnSubmitError}
              onValid={handleOnSubmit}
            />
          )}
        </Card.Body>
      </Card>
    </Box>
  )
}

export default ReceptionInfo
