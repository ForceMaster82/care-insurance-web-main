import React, {ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import TableGrid from '../../../../../components/table/TableGrid'
import Th from '../../../../../components/table/Th'
import Pagination from '../../../../../components/Pagination'
import useReceptionCaregivingChargeModificationHistory from '../../../../../hooks/api/reception/use-reception-caregiving-charge-modification-history'
import usePagination from '../../../../../hooks/use-pagination'
import EmptySearchResult from '../../../../../components/EmptySearchResult'
import {tableItemWidths} from '../../../../../constants'
import CaregivingChargeModificationHistoryItem from './CaregivingChargeModificationHistoryItem'

const TABLE_GRID_TEMPLATE = `${tableItemWidths.sm}px ${tableItemWidths.md}px minmax(${tableItemWidths.lg}px, 3fr) minmax(${tableItemWidths.xl}px, 4fr) minmax(${tableItemWidths.xl}px, 4fr) minmax(${tableItemWidths.lg}px, 3fr) minmax(${tableItemWidths.lg}px, 3fr)`

const PAGE_SIZE = 10

interface IProps {
  receptionId: string
}

const CaregivingChargeModificationHistory = ({
  receptionId,
}: IProps): ReactElement | null => {
  const {pageNumber, setPageNumber} = usePagination()

  const data = useReceptionCaregivingChargeModificationHistory({
    pageNumber,
    pageSize: PAGE_SIZE,
    receptionId,
  })

  if (!data) {
    return null
  }

  return (
    <Box gap="md">
      {/** table */}
      <Box gap="xxs">
        {/** table Header */}
        <TableGrid
          gap="xxs"
          gridTemplate={TABLE_GRID_TEMPLATE}
          placeItems="stretch"
        >
          <Th>번호</Th>
          <Th>정산회차</Th>
          <Th>수정항목</Th>
          <Th>이전 데이터</Th>
          <Th>변경 데이터</Th>
          <Th>수정자</Th>
          <Th>수정일시</Th>
        </TableGrid>
        {/** table Rows */}
        {(data.totalItemCount > 0 && (
          <Box gap="xxs">
            {data.items.map((item, index) => (
              <CaregivingChargeModificationHistoryItem
                currentPageNumber={data.currentPageNumber}
                data={item}
                gridTemplate={TABLE_GRID_TEMPLATE}
                key={`caregiving-charge-modification-history-item-${item.modifiedProperty}-${item.modifiedDateTime}-${item.modifierId}`}
                listItemIndex={index}
                pageSize={PAGE_SIZE}
                totalItemCount={data.totalItemCount}
              />
            ))}
          </Box>
        )) || <EmptySearchResult bottomDividerVisible />}
      </Box>
      {data.totalItemCount > 0 && (
        <Box alignItems="center">
          <Pagination
            currentPageNumber={data.currentPageNumber}
            lastPageNumber={data.lastPageNumber}
            onClick={setPageNumber}
            pageLimit={PAGE_SIZE}
          />
        </Box>
      )}
    </Box>
  )
}

export default CaregivingChargeModificationHistory
