/* eslint-disable unicorn/filename-case */
/* eslint-disable no-magic-numbers */
import {Box, Button, Link} from '@caredoc/ui-web'
import React, {ReactElement, useCallback, useMemo} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import ListContainer from '../../../components/list/ListContainer'
import ListTitle from '../../../components/list/ListTitle'
import ListItem from '../../../components/list/ListItem'
import EllipsisText from '../../../components/list/EllipsisText'
import BillingStatusChip from '../../../components/chips/BillingStatusChip'
import {buttonWidths} from '../../../constants'
import BillingTransactionListModal from '../../../components/billing-transaction/BillingTransactionListModal'
import {BillingTransactionModalType} from '../../../types'
import BillingTransactionRegistrationModal from '../../../components/billing-transaction/BillingTransactionRegistrationModal'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import getItemOrder from '~utils/get-item-order'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'
import EmptySearchResult from '~components/EmptySearchResult'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import {formatDate} from '~utils/date'

const TITLE_LIST = [
  '번호',
  '사고번호',
  '고객명',
  '청구차수',
  '청구 금액',
  '입출금 총액',
  '차액',
  '입출금 일자',
  '상태',
  '입출금 내역 추가',
]

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr)'

interface ISearchResultProps {
  data?: IPaginationResponse<BillingResource>
  onClickListItemAccidentNumber: (id: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  selectedListItemIds: string[]
}

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    selectedListItemIds,
    onClickListItemAccidentNumber,
    onSelectAllListItem,
    onSelectListItem,
    data,
  } = props

  const modalStore = useModalStore<BillingTransactionModalType>()

  const allSelected = useMemo(
    () =>
      data && data.items.length > 0
        ? data.items.length === selectedListItemIds.length
        : false,
    [data, selectedListItemIds.length],
  )

  const handleOnSelectAll = useCallback(() => {
    data &&
      onSelectAllListItem(
        (allSelected && []) || data.items.map((item) => item.id),
      )
  }, [allSelected, data, onSelectAllListItem])

  const handleOnClickTransactionDate = (billingId: string) => () => {
    modalStore.create(
      'BILLING_TRANSACTION_LIST',
      <BillingTransactionListModal
        billingId={billingId}
        onClickClose={(): void => modalStore.delete('BILLING_TRANSACTION_LIST')}
      />,
    )
  }

  const handleOnClickBillingTransactionRegistration =
    (billingId: string) => () => {
      modalStore.create(
        'BILLING_TRANSACTION_REGISTRATION',
        <BillingTransactionRegistrationModal
          billingId={billingId}
          onClickClose={(): void =>
            modalStore.delete('BILLING_TRANSACTION_REGISTRATION')
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
            key={`billing-transaction-item-${item.id}`}
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
              {formatStaticNumberWithComma(item.totalAmount)}
            </EllipsisText>
            <EllipsisText>
              {formatStaticNumberWithComma(item.totalDepositWithdrawalAmount)}
            </EllipsisText>
            <EllipsisText>
              {formatStaticNumberWithComma(item.differenceAmount, {
                signDisplay: 'exceptZero',
              })}
            </EllipsisText>
            <Link
              color="information"
              onClick={handleOnClickTransactionDate(item.id)}
            >
              {formatDate(item.transactionDate)}
            </Link>
            <BillingStatusChip status={item.billingProgressingStatus} />
            <Box width={buttonWidths.xs}>
              <Button
                color="primary"
                onClick={handleOnClickBillingTransactionRegistration(item.id)}
                size="xs"
                variant="secondary"
              >
                추가
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
