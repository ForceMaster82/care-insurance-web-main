/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import {tableItemWidths} from '../../constants'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import Modal from '../Modal'
import TableGrid from '../table/TableGrid'
import Td from '../table/Td'
import Th from '../table/Th'
import ReceptionSettlementResource from '../../models/dto/reception-settlement/Resource'
import SettlementResource from '../../models/dto/settlement/Resource'
import SettlementTransactionListItem from './SettlementTransactionListItem'
import Pagination from '~components/Pagination'
import usePagination from '~hooks/use-pagination'
import useSettlementTransactionList from '~hooks/api/settlement/use-settlement-transactoin-list'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import EmptySearchResult from '~components/EmptySearchResult'

interface IProps {
  onClickCloseButton: () => void
  settlementData: ReceptionSettlementResource | SettlementResource
}

const TABLE_GRID_TEMPLATE = {
  CAREGIVING_INFO: 'repeat(4, 1fr)',
  TRANSACTION_HISTORY: `${tableItemWidths.sm}px ${tableItemWidths.md}px repeat(4, 1fr) ${tableItemWidths.md}px`,
} as const

const SettlementTransactionListModal = (props: IProps): ReactElement | null => {
  const {onClickCloseButton, settlementData} = props

  const {pageNumber, setPageNumber} = usePagination()

  const settlementTransactionList = useSettlementTransactionList({
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    settlementId: settlementData.id,
  })

  if (!settlementTransactionList) {
    return null
  }

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickCloseButton}
      title="입출금 내역"
    >
      <Box gap="md">
        {/** table 1 */}
        <Box gap="xxs">
          {/** table Header */}
          <TableGrid
            gap="xxs"
            gridTemplate={TABLE_GRID_TEMPLATE.CAREGIVING_INFO}
            placeItems="stretch"
          >
            <Th>사고번호</Th>
            <Th>고객명</Th>
            <Th>간병차수</Th>
            <Th>산정금액</Th>
          </TableGrid>
          {/** table Row */}
          <TableGrid
            gap="xxs"
            gridTemplate={TABLE_GRID_TEMPLATE.CAREGIVING_INFO}
            placeItems="stretch"
          >
            <Td>{settlementData.accidentNumber}</Td>
            <Td>{settlementData.patientName}</Td>
            <Td>{settlementData.caregivingRoundNumber}</Td>
            <Td>{formatStaticNumberWithComma(settlementData.totalAmount)}</Td>
          </TableGrid>
        </Box>
        {/** table 2 */}
        <Box gap="xxs">
          {/** table Header */}
          <TableGrid
            gap="xxs"
            gridTemplate={TABLE_GRID_TEMPLATE.TRANSACTION_HISTORY}
            placeItems="stretch"
          >
            <Th>번호</Th>
            <Th>입금 구분</Th>
            <Th>입금액</Th>
            <Th>출금액</Th>
            <Th>입출금일자</Th>
            <Th>처리일시</Th>
            <Th>담당자</Th>
          </TableGrid>
          {/** table Rows */}
          <Box gap="xxs">
            {settlementTransactionList.totalItemCount > 0 ? (
              settlementTransactionList.items.map((item, index) => (
                <SettlementTransactionListItem
                  currentPageNumber={
                    settlementTransactionList.currentPageNumber
                  }
                  data={item}
                  gridTemplate={TABLE_GRID_TEMPLATE.TRANSACTION_HISTORY}
                  key={`settlement-transaction-list-item-${index}`}
                  listItemIndex={index}
                  totalItemCount={settlementTransactionList.totalItemCount}
                />
              ))
            ) : (
              <EmptySearchResult bottomDividerVisible />
            )}
          </Box>
        </Box>
        {settlementTransactionList.totalItemCount > 0 && (
          <Box alignSelf="center">
            <Pagination
              currentPageNumber={settlementTransactionList?.currentPageNumber}
              lastPageNumber={settlementTransactionList?.lastPageNumber}
              onClick={setPageNumber}
            />
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default SettlementTransactionListModal
