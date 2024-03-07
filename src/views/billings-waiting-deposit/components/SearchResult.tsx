/* eslint-disable no-magic-numbers */
/* eslint-disable unicorn/filename-case */
import {Box, Button, Link} from '@caredoc/ui-web'
import React, {ReactElement, useCallback, useMemo} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import ListContainer from '../../../components/list/ListContainer'
import ListTitle from '../../../components/list/ListTitle'
import ListItem from '../../../components/list/ListItem'
import EllipsisText from '../../../components/list/EllipsisText'
import {buttonWidths} from '../../../constants'
import {BillingWaitingDepositModalType} from '../../../types'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import BillingDepositRegistrationModal from '../../../components/billing-transaction/BillingDepositRegistrationModal'
import getItemOrder from '~utils/get-item-order'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'
import EmptySearchResult from '~components/EmptySearchResult'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import {formatDate, formatDateTime} from '~utils/date'

const TITLE_LIST = [
  '번호',
  '사고번호',
  '고객명',
  '청구차수',
  '사용기간',
  '청구금액',
  '청구일자',
  '입금 등록',
]

const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(80px, 2fr) minmax(320px, 8fr) minmax(120px, 3fr) minmax(120px, 3fr)minmax(120px, 3fr) '

interface ISearchResultProps {
  data?: IPaginationResponse<BillingResource>
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  selectedListItemIds: string[]
}

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    data,
    onClickListItemAccidentNumber,
    onSelectListItem,
    onSelectAllListItem,
    selectedListItemIds,
  } = props

  const modalStore = useModalStore<BillingWaitingDepositModalType>()

  const allSelected = useMemo(
    () =>
      data && data.items.length > 0
        ? data.items.length === selectedListItemIds.length
        : false,
    [data, selectedListItemIds.length],
  )

  const handleOnSelectAll = useCallback((): void => {
    data &&
      onSelectAllListItem((allSelected && []) || data?.items.map(({id}) => id))
  }, [allSelected, data, onSelectAllListItem])

  const handleOnClickDepositRegistration = (billingId: string) => () => {
    modalStore.create(
      'BILLING_DEPOSIT_REGISTRATION',
      <BillingDepositRegistrationModal
        billingId={billingId}
        onClickClose={(): void =>
          modalStore.delete('BILLING_DEPOSIT_REGISTRATION')
        }
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
            key={`billing-waiting-deposit-item-${item.id}`}
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
              onClick={(): void =>
                onClickListItemAccidentNumber(item.receptionId)
              }
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
            <EllipsisText>
              {formatStaticNumberWithComma(item.totalAmount)}
            </EllipsisText>
            <EllipsisText>{formatDate(item.billingDate)}</EllipsisText>
            <Box width={buttonWidths.xs}>
              <Button
                color="primary"
                onClick={handleOnClickDepositRegistration(item.id)}
                size="xs"
                variant="secondary"
              >
                등록
              </Button>
            </Box>
          </ListItem>
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
