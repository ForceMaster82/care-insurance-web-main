/* eslint-disable unicorn/filename-case */
import {Box, ComboBox, InfoBox, Link} from '@caredoc/ui-web'
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import TableGrid from '../../../../components/table/TableGrid'
import Td from '../../../../components/table/Td'
import Th from '../../../../components/table/Th'
import {
  EMPTY_VALUE_TEXT,
  ORGANIZATION_TYPE,
  organizationTypes,
} from '../../../../constants'
import {OrganizationType} from '../../../../types'
import useExternalCaregivingOrganizationList from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization-list'
import {
  getCaregivingManagerOptions,
  getExternalCaregivingOrganizationOptions,
} from '../../../../utils/option'
import useInternalCaregivingManagerList from '../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-list'
import useExternalCaregivingManagerList from '../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-list'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import useReceptionUpdate from '../../../../hooks/api/reception/use-reception-update'
import Card from '../../../../components/Card'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import {ReceptionCaregivingManagerInfoData} from '../../../../types/form'

const MODAL_HEIGHT = 640

interface IProps {
  onClickClose: () => void
  onSubmit?: (data: ReceptionCaregivingManagerInfoData) => void
  receptionId: string
}

const CaregivingManagerAssignModal = (props: IProps): ReactElement => {
  const {onClickClose, receptionId, onSubmit} = props

  const [selectedOrganizationType, selectOrganizationType] =
    useState<OrganizationType | null>(null)
  const [selectedAffiliated, selectAffiliated] = useState<string | null>(null)

  const externalOrganizations = useExternalCaregivingOrganizationList({
    externalCaregivingOrganizationType:
      (selectedOrganizationType !== 'INTERNAL' && selectedOrganizationType) ||
      null,
  })
  const externalOrganizationOptions = useMemo(
    () => getExternalCaregivingOrganizationOptions(externalOrganizations),
    [externalOrganizations],
  )

  const internalCaregivingManagers = useInternalCaregivingManagerList({
    enabled:
      selectedOrganizationType === 'INTERNAL' ||
      selectedOrganizationType === 'ORGANIZATION',
  })
  const internalCaregivingManagerOptions = useMemo(
    () => getCaregivingManagerOptions(internalCaregivingManagers),
    [internalCaregivingManagers],
  )

  const externalCaregivingManagers = useExternalCaregivingManagerList({
    externalCaregivingOrganizationId: selectedAffiliated,
  })
  const externalCaregivingManagerOptions = useMemo(
    () => getCaregivingManagerOptions(externalCaregivingManagers),
    [externalCaregivingManagers],
  )

  const selectedOrganizationName =
    (selectedOrganizationType === 'INTERNAL' &&
      ORGANIZATION_TYPE[selectedOrganizationType]) ||
    externalOrganizationOptions.find((item) => item.data === selectedAffiliated)
      ?.label ||
    EMPTY_VALUE_TEXT

  const caregivingManagerOptions =
    (selectedOrganizationType === null && []) ||
    (selectedOrganizationType !== 'INTERNAL' &&
      selectedAffiliated === null &&
      []) ||
    ((selectedOrganizationType === 'INTERNAL' ||
      selectedOrganizationType === 'ORGANIZATION') &&
      internalCaregivingManagerOptions) ||
    externalCaregivingManagerOptions

  const queryClient = useQueryClient()

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {mutate: updateReception} = useReceptionUpdate()

  const handleOnClickCaregivingManager = useCallback(
    (managingUserId: string) => {
      const receptionUpdateInput = new ReceptionUpdateInput(receptionData)
      receptionUpdateInput.caregivingManagerInfo.data = {
        managingUserId,
        organizationId:
          selectedOrganizationType === 'INTERNAL' ? null : selectedAffiliated,
        organizationType: selectedOrganizationType,
      }

      if (onSubmit) {
        onSubmit(receptionUpdateInput.caregivingManagerInfo.data)

        return
      }

      updateReception(
        {
          pathParams: {receptionId},
          payload: receptionUpdateInput.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['reception', 'detail', {id: receptionId}],
            })
            queryClient.invalidateQueries({
              queryKey: ['reception-caregiving-round', 'list', {receptionId}],
            })
            queryClient.invalidateQueries({
              queryKey: ['reception-modification', {receptionId}],
            })

            onClickClose()
          },
        },
      )
    },
    [
      onClickClose,
      onSubmit,
      queryClient,
      receptionData,
      receptionId,
      selectedAffiliated,
      selectedOrganizationType,
      updateReception,
    ],
  )

  useEffect(() => {
    if (selectedOrganizationType) {
      selectAffiliated(null)
    }
  }, [selectedOrganizationType])

  return (
    <Modal
      modalHeight={MODAL_HEIGHT}
      modalWidth="sm"
      onClose={onClickClose}
      title="담당자 배정"
    >
      <Box gap="sm">
        {/** select organization type & organization  */}
        <Card.Item title="배정 담당처">
          <Box flexDirection="row" gap="xs">
            <Box flex={1}>
              <ComboBox
                items={organizationTypes}
                onSelect={selectOrganizationType}
                value={selectedOrganizationType}
              />
            </Box>
            <Box flex={1}>
              <ComboBox
                disabled={
                  selectedOrganizationType === 'INTERNAL' ||
                  !selectedOrganizationType
                }
                items={externalOrganizationOptions}
                onSelect={selectAffiliated}
                value={selectedAffiliated}
              />
            </Box>
          </Box>
        </Card.Item>
        {/** search Result for Managers */}
        {caregivingManagerOptions.length > 0 && (
          <>
            <InfoBox size="md" state="info">
              배정할 담당자를 선택해 주세요.
            </InfoBox>
            <Box gap="xxs">
              <TableGrid
                gap="xxs"
                gridTemplate="1fr 1fr 1fr"
                placeItems="stretch"
              >
                <Th>번호</Th>
                <Th>담당처</Th>
                <Th>담당자명</Th>
              </TableGrid>
              <Box gap="xxs">
                {caregivingManagerOptions.map((item, index, list) => (
                  <TableGrid
                    gap="xxs"
                    gridTemplate="1fr 1fr 1fr"
                    key={`caregiving-manager-${item.managingUserId}`}
                    placeItems="stretch"
                  >
                    <Td>{list.length - index}</Td>
                    <Td>{selectedOrganizationName}</Td>
                    <Td>
                      <Link
                        color="information"
                        onClick={(): void =>
                          handleOnClickCaregivingManager(item.managingUserId)
                        }
                        size="xs"
                      >
                        {item.name}
                      </Link>
                    </Td>
                  </TableGrid>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default CaregivingManagerAssignModal
