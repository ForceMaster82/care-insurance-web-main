import {Checkbox, Typography} from '@caredoc/ui-web'
import React from 'react'

import {sizes} from '@caredoc/ui-master'
import OutlinedTableCell from '../../../../components/table/OutlinedTableCell'
import {GRID_TEMPLATE} from '.'
import TableGrid from '~components/table/TableGrid'

interface ITableTitleProps {
  isSelected: boolean
  onSelect: () => void
}
const TableTitle = (props: ITableTitleProps) => {
  const {isSelected, onSelect} = props
  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={GRID_TEMPLATE}
    >
      <OutlinedTableCell>
        <Checkbox
          color="primary"
          onClick={onSelect}
          size="md"
          value={isSelected}
        />
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body3">사고번호</Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body3">고객명</Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body3">간병차수</Typography>
      </OutlinedTableCell>
      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography variant="caption1">청구</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography variant="body3">청구금액</Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>
      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography variant="caption1">정산</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">간병인명</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">정산금액</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">출금액</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">입금액</Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>
      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography variant="caption1">매출</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">회차수익</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">케어닥수익</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">제휴사</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography variant="body3">분배수익</Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}

export default TableTitle
