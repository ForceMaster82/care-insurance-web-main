/* eslint-disable unicorn/filename-case */
import {Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import OutlinedTableCell from '../../../../components/table/OutlinedTableCell'
import {GRID_TEMPLATE} from '.'
import TableGrid from '~components/table/TableGrid'

const TableTitle = (): ReactElement => {
  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={GRID_TEMPLATE}
    >
      <OutlinedTableCell>
        <Typography variant="body3">번호</Typography>
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
        <OutlinedTableCell>
          <Typography variant="caption1">청구</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">청구금액</Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell>
          <Typography variant="caption1">정산</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell>
            <Typography variant="body3">간병인명</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">정산금액</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">출금액</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">입금액</Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell>
          <Typography variant="caption1">매출</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell>
            <Typography variant="body3">회차수익</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">케어닥수익</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">제휴사</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body3">분배수익</Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}

export default TableTitle
