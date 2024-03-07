/* eslint-disable no-alert */
import {Button} from '@caredoc/ui-web'
import React, {ReactElement, useCallback} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import useCaregivingChargeDetail from '../../../hooks/api/caregiving-round/use-caregiving-charge-detail'
import useCaregivingChargeUpdate from '../../../hooks/api/caregiving-round/use-caregiving-charge-update'
import CaregivingChargeInput from '../../../models/dto/caregiving-charge/Input'

interface IProps {
  caregivingRoundId: string
}

const CaregivingChargeConfirmButton = ({
  caregivingRoundId,
}: IProps): ReactElement => {
  const {data: caregivingCharge} = useCaregivingChargeDetail({
    caregivingRoundId,
  })

  const {mutate: updateCaregivingCharge} = useCaregivingChargeUpdate()

  const queryClient = useQueryClient()

  const handleOnClick = useCallback(() => {
    const confirmRequested = confirm(
      '간병비 확정 처리 시, 수정하실 수 없습니다.\n계속하시겠습니까?',
    )
    if (!caregivingCharge || !confirmRequested) {
      return
    }

    const input = new CaregivingChargeInput(caregivingCharge)
    input.caregivingChargeConfirmStatus = 'CONFIRMED'

    updateCaregivingCharge(
      {
        pathParams: {caregivingRoundId},
        payload: input.input,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['caregiving-charge', 'detail', {caregivingRoundId}],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'reception-settlement',
              'list',
              {receptionId: caregivingCharge.caregivingRoundInfo.receptionId},
            ],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'reception-caregiving-charge-modification',
              {receptionId: caregivingCharge.caregivingRoundInfo.receptionId},
            ],
          })
        },
      },
    )
  }, [caregivingCharge, caregivingRoundId, queryClient, updateCaregivingCharge])

  return (
    <Button color="primary" onClick={handleOnClick}>
      간병비 확정
    </Button>
  )
}

export default CaregivingChargeConfirmButton
