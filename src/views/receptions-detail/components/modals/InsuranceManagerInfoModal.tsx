/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import Modal from '../../../../components/Modal'
import Th from '../../../../components/table/Th'
import Td from '../../../../components/table/Td'
import {INSURANCE_COMPANY} from '../../../../constants'
import ReceptionResource from '../../../../models/dto/reception/Resource'
import {formatPhoneNumberWithHyphen} from '../../../../utils/formatter'

interface IProps {
  onClickClose: () => void
  receptionResource: ReceptionResource
}

const InsuranceManagerInfoModal = (props: IProps): ReactElement => {
  const {receptionResource, onClickClose} = props

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="sm"
      onClose={onClickClose}
      title="보험사 담당자 정보"
    >
      <Box flexDirection="row" gap="xxs">
        <Box flex={1} gap="xxs">
          <Th>보험사명</Th>
          <Th>접수부점</Th>
          <Th>접수자</Th>
          <Th>연락처</Th>
        </Box>
        <Box flex={3} gap="xxs">
          <Td>{INSURANCE_COMPANY}</Td>
          <Td>{receptionResource.insuranceManagerInfo.branchName}</Td>
          <Td>{receptionResource.insuranceManagerInfo.receptionistName}</Td>
          <Td>
            {formatPhoneNumberWithHyphen(
              receptionResource.insuranceManagerInfo.phoneNumber,
            )}
          </Td>
        </Box>
      </Box>
    </Modal>
  )
}

export default InsuranceManagerInfoModal
