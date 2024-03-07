/* eslint-disable unicorn/filename-case */
import {Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {sizes} from '@caredoc/ui-master'
import TableGrid from '~components/table/TableGrid'
import OutlinedTableCell from '~components/table/OutlinedTableCell'

interface IProps {
  gridTemplate: string
}

const TableTitle = ({gridTemplate}: IProps): ReactElement => {
  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={gridTemplate}
      minWidth="fit-content"
    >
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body3">
          조회일자
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body3">
          요일
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell p="none">
        <Typography textAlign="center" variant="body3">
          {'전체\n배정 건'}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell p="none">
        <Typography textAlign="center" variant="body3">
          {'간병인\n파견 건'}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell p="none">
        <Typography textAlign="center" variant="body3">
          {'개인구인\n건'}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell p="none">
        <Typography textAlign="center" variant="body3">
          {'석션 등\n의료행위'}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell p="none">
        <Typography textAlign="center" variant="body3">
          취소 건
        </Typography>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography textAlign="center" variant="caption1">
            지급 금액
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flex={1} flexDirection="row" isWrapper>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              지급 요청 건
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              지급 요청 금액
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              지급 받은 건
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              지급 받은 금액
            </Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography textAlign="center" variant="caption1">
            환수 건
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              환수 건
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              환수 금액
            </Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell>
        <Typography textAlign="center" variant="body3">
          민원 건
        </Typography>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography textAlign="center" variant="caption1">
            당일
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper overflow="hidden">
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              당일배정 요청 건
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              배정 건
            </Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell isWrapper>
        <OutlinedTableCell height={sizes.sm} p="none">
          <Typography textAlign="center" variant="caption1">
            {'단기 사용\n(3일 이내 요청 건)'}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell flexDirection="row" isWrapper>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              단기 요청 건
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell height={sizes.sm} p="none">
            <Typography textAlign="center" variant="body3">
              배정 건
            </Typography>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}
export default TableTitle
