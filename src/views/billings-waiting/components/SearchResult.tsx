/* eslint-disable unicorn/filename-case */
/* eslint-disable no-magic-numbers */
import {Link} from '@caredoc/ui-web'
import React, {ReactElement, useCallback, useMemo} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import ListContainer from '../../../components/list/ListContainer'
import ListTitle from '../../../components/list/ListTitle'
import EllipsisText from '../../../components/list/EllipsisText'
import ListItem from '../../../components/list/ListItem'
import {formatDateTime} from '../../../utils/date'
import {BillingWaitingModalType} from '../../../types'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import BillingAmountDetailModal from './BillingAmountDetailModal'
import getItemOrder from '~utils/get-item-order'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import EmptySearchResult from '~components/EmptySearchResult'

const TITLE_LIST = [
  '번호',
  '사고번호',
  '고객명',
  '청구차수',
  '사용기간',
  '실사용기간',
  '청구 금액',
]

interface ISearchResultProps {
  data?: IPaginationResponse<BillingResource>
  onClickAccidentNumber: (receptionId: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  selectedListItemIds: string[]
}

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr)minmax(120px, 3fr) minmax(80px, 2fr) minmax(320px, 8fr) minmax(120px, 3fr) minmax(120px, 3fr)'

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    data,
    onClickAccidentNumber,
    selectedListItemIds,
    onSelectListItem,
    onSelectAllListItem,
  } = props

  const modalStore = useModalStore<BillingWaitingModalType>()

  const allSelected = useMemo<boolean>(
    () =>
      data && data.items.length > 0
        ? data.items.length === selectedListItemIds.length
        : false,
    [data, selectedListItemIds],
  )

  const handleOnSelectAll = useCallback((): void => {
    data &&
      onSelectAllListItem((allSelected && []) || data.items.map(({id}) => id))
  }, [allSelected, data, onSelectAllListItem])

  const handleOnClickBillingAmount =
    (billingId: string, receptionId: string) => () => {
      modalStore.create(
        'BILLING_AMOUNT_DETAIL',
        <BillingAmountDetailModal
          billingId={billingId}
          onClickClose={(): void => modalStore.delete('BILLING_AMOUNT_DETAIL')}
          receptionId={receptionId}
        />,
      )
    }

  return (
    <ListContainer>
      <ListTitle
        gridTemplate={GRID_TEMPLATE}
        isSelected={allSelected}
        onSelect={handleOnSelectAll}
        titleList={TITLE_LIST}
        useSelection
      />
      {data && data.items.length > 0 ? (
        data.items.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE}
            isSelected={selectedListItemIds.includes(item.id)}
            key={`billing-waiting-item-${item.id}`}
            onSelect={(): void => onSelectListItem(item.id)}
            useSelection
          >
            <EllipsisText>
              {getItemOrder(
                data.totalItemCount,
                data.currentPageNumber,
                DEFAULT_PAGE_SIZE,
                index,
              )}
            </EllipsisText>
            <Link
              color="information"
              onClick={(): void => onClickAccidentNumber(item.receptionId)}
            >
              {item.accidentNumber}
            </Link>
            <EllipsisText>{item.patientName}</EllipsisText>
            <EllipsisText>{item.roundNumber}</EllipsisText>
            <EllipsisText>
              {formatDateTime(item.startDateTime) +
                ' ~ ' +
                formatDateTime(item.endDateTime)}
            </EllipsisText>
            <EllipsisText>{item.actualUsagePeriod}</EllipsisText>
            <Link
              color="information"
              onClick={handleOnClickBillingAmount(item.id, item.receptionId)}
            >
              {formatStaticNumberWithComma(item.totalAmount)}
            </Link>
          </ListItem>
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
