import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import TableInformationCell from '../table/TableInformationCell'
import Pagination from '../Pagination'
import usePagination from '../../hooks/use-pagination'
import useBillingDetail from '../../hooks/api/billing/use-billing-detail'
import useReceptionDetail from '../../hooks/api/reception/use-reception-detail'
import useBillingTransactionList from '../../hooks/api/billing/use-billing-transaction-list'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import EmptySearchResult from '../EmptySearchResult'
import {tableItemWidths} from '../../constants'
import TableGrid from '../table/TableGrid'
import Th from '../table/Th'
import Modal from '../Modal'
import BillingTransactionListItem from './BillingTransactionListItem'

const PAGE_SIZE = 10
const GRID_TEMPLATE = `${tableItemWidths.sm}px ${tableItemWidths.md}px repeat(5, 1fr)`

interface IProps {
  billingId: string
  onClickClose: () => void
}
const BillingTransactionListModal = ({
  billingId,
  onClickClose,
}: IProps): ReactElement | null => {
  const {pageNumber, setPageNumber} = usePagination()

  const {data: billingResource} = useBillingDetail({billingId})
  const {data: receptionResource} = useReceptionDetail({
    receptionId: billingResource?.receptionId,
  })
  const billingTransactionListData = useBillingTransactionList({
    billingId,
    pageNumber,
    pageSize: PAGE_SIZE,
  })

  if (!billingResource || !billingTransactionListData) {
    return null
  }

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickClose}
      title="입출금 내역"
    >
      <Box gap="md">
        <Box flex={1} flexDirection="row" gap="xxs">
          <TableInformationCell
            contents={billingResource.accidentNumber}
            flex={1}
            title="사고번호"
          />
          <TableInformationCell
            contents={receptionResource?.patientInfo.name}
            flex={1}
            title="고객명"
          />
          <TableInformationCell
            contents={billingResource.roundNumber}
            flex={1}
            title="청구차수"
          />
          <TableInformationCell
            contents={
              billingResource &&
              formatStaticNumberWithComma(billingResource.totalAmount)
            }
            flex={1}
            title="청구금액"
          />
          <TableInformationCell
            contents={formatStaticNumberWithComma(
              billingResource.differenceAmount,
              {signDisplay: 'exceptZero'},
            )}
            flex={1}
            title="차액"
          />
        </Box>
        <Box>
          <TableGrid
            gap="xxs"
            gridTemplate={GRID_TEMPLATE}
            placeItems="stretch"
          >
            <Th>번호</Th>
            <Th>입금구분</Th>
            <Th>입금액</Th>
            <Th>출금액</Th>
            <Th>입출금일자</Th>
            <Th>처리일시</Th>
            <Th>담당자</Th>
          </TableGrid>
          {billingTransactionListData.totalItemCount > 0 ? (
            billingTransactionListData.items.map((item, index) => (
              <BillingTransactionListItem
                currentPageNumber={billingTransactionListData.currentPageNumber}
                data={item}
                gridTemplate={GRID_TEMPLATE}
                key={`billing-transaction-${item.transactionType}-${item.enteredDateTime}`}
                listItemIndex={index}
                pageSize={PAGE_SIZE}
                totalItemCount={billingTransactionListData.totalItemCount}
              />
            ))
          ) : (
            <EmptySearchResult bottomDividerVisible />
          )}
        </Box>
        {billingTransactionListData.totalItemCount > 0 && (
          <Box alignItems="center">
            <Pagination
              currentPageNumber={billingTransactionListData.currentPageNumber}
              lastPageNumber={billingTransactionListData.lastPageNumber}
              onClick={setPageNumber}
            />
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default BillingTransactionListModal
