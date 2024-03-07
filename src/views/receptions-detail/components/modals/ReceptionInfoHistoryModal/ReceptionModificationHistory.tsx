import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import TableGrid from '../../../../../components/table/TableGrid'
import {tableItemWidths} from '../../../../../constants'
import Th from '../../../../../components/table/Th'
import Pagination from '../../../../../components/Pagination'
import useReceptionModificationHistory from '../../../../../hooks/api/reception/use-reception-modification-history'
import usePagination from '../../../../../hooks/use-pagination'
import EmptySearchResult from '../../../../../components/EmptySearchResult'
import ReceptionModificationHistoryItem from './ReceptionModificationHistoryItem'

const TABLE_GRID_TEMPLATE = `${tableItemWidths.sm}px minmax(${tableItemWidths.lg}px, 3fr) minmax(${tableItemWidths.xl}px, 4fr) minmax(${tableItemWidths.xl}px, 4fr) minmax(${tableItemWidths.lg}px, 3fr) minmax(${tableItemWidths.lg}px, 3fr)`

const PAGE_SIZE = 10

interface IProps {
  receptionId: string
}

const ReceptionModificationHistory = ({
  receptionId,
}: IProps): ReactElement | null => {
  const {pageNumber, setPageNumber} = usePagination()

  const data = useReceptionModificationHistory({
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
              <ReceptionModificationHistoryItem
                currentPageNumber={data.currentPageNumber}
                data={item}
                gridTemplate={TABLE_GRID_TEMPLATE}
                key={`reception-modification-history-item-${item.modifiedProperty}-${item.modifiedDateTime}`}
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

export default ReceptionModificationHistory
