/* eslint-disable unicorn/filename-case */
import {Box, Icon, Typography} from '@caredoc/ui-web'
import {Colors, CustomColorKey} from '@caredoc/ui-master'

import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'

const PAGINATION_HEIGHT = 40
const NUMBER_BOX_WIDTH = 40
const NAVIGATOR_BOX_WIDTH = 44
const DEFAULT_PAGE_RANGE_DISPLAYED = 5
const ACTIVE_COLOR: CustomColorKey = 'primary'
const INACTIVE_BORDER_COLOR: CustomColorKey = 'borderTertiary'
const INACTIVE_FONT_COLOR: CustomColorKey = 'fontTertiary'
const INACTIVE_ICON_COLOR: keyof Colors = 'n400'

interface IPaginationItemProps {
  isActive?: boolean
  navigator?: 'left' | 'right'
  onClick: () => void
  width?: number
}

interface IPaginationProps {
  currentPageNumber: number
  lastPageNumber: number
  onClick?: (pageNumber: number) => void
  pageLimit?: number
}

const PaginationItem = ({
  children,
  onClick,
  width = NUMBER_BOX_WIDTH,
  isActive = false,
  navigator,
}: PropsWithChildren<IPaginationItemProps>): ReactElement => {
  const borderWidth = useMemo(() => {
    const itemSideWidth = isActive ? '1px' : '0.5px'
    if (navigator === 'left') {
      return `1px 0.5px 1px 1px`
    }
    if (navigator === 'right') {
      return `1px 1px 1px 0.5px`
    }
    return `1px ${itemSideWidth} `
  }, [isActive, navigator])

  return (
    <Box
      alignItems="center"
      borderColor={isActive ? ACTIVE_COLOR : INACTIVE_BORDER_COLOR}
      borderStyle="solid"
      height="100%"
      justifyContent="center"
      onClick={onClick}
      style={{borderWidth}}
      width={width}
    >
      {navigator === 'left' ? (
        <Icon fill={INACTIVE_ICON_COLOR} name="chevron-left" />
      ) : navigator === 'right' ? (
        <Icon fill={INACTIVE_ICON_COLOR} name="chevron-right" />
      ) : (
        <Typography
          textColor={isActive ? ACTIVE_COLOR : INACTIVE_FONT_COLOR}
          variant="body3"
        >
          {children}
        </Typography>
      )}
    </Box>
  )
}

const Pagination = (props: IPaginationProps): ReactElement => {
  const {
    currentPageNumber,
    lastPageNumber,
    onClick,
    pageLimit = DEFAULT_PAGE_RANGE_DISPLAYED,
  } = props

  const displayedPageList = useMemo(() => {
    const startPageNumber =
      (Math.ceil(currentPageNumber / pageLimit) - 1) * pageLimit + 1
    const endPageNumber = startPageNumber + pageLimit - 1

    return Array.from(
      {
        length:
          endPageNumber > lastPageNumber
            ? lastPageNumber % pageLimit
            : pageLimit,
      },
      (_, index) => startPageNumber + index,
    )
  }, [currentPageNumber, lastPageNumber, pageLimit])

  const handleOnClickPage = useCallback(
    (pageNumber: number): void => {
      onClick?.(pageNumber)
    },
    [onClick],
  )
  const handleOnClickPrevNavigator = useCallback(() => {
    const isFirstPageRange = displayedPageList[0] === 1
    if (isFirstPageRange) {
      return
    }

    const targetPageNumber = displayedPageList[0] - pageLimit
    handleOnClickPage(targetPageNumber)
  }, [handleOnClickPage, displayedPageList, pageLimit])

  const handleOnClickNextNavigator = useCallback(() => {
    const isLastPageRange =
      displayedPageList[displayedPageList.length - 1] === lastPageNumber
    if (isLastPageRange) {
      return
    }

    const targetPageNumber = displayedPageList[0] + pageLimit
    handleOnClickPage(targetPageNumber)
  }, [handleOnClickPage, lastPageNumber, displayedPageList, pageLimit])

  return (
    <Box
      backgroundColor="bgPrimary"
      flexDirection="row"
      height={PAGINATION_HEIGHT}
      width="fit-content"
    >
      <PaginationItem
        navigator="left"
        onClick={handleOnClickPrevNavigator}
        width={NAVIGATOR_BOX_WIDTH}
      />
      {displayedPageList.map((pageNumber) => {
        return (
          <PaginationItem
            isActive={pageNumber === currentPageNumber}
            key={`pagination-item-${pageNumber}`}
            onClick={(): void => handleOnClickPage(pageNumber)}
          >
            {pageNumber}
          </PaginationItem>
        )
      })}
      <PaginationItem
        navigator="right"
        onClick={handleOnClickNextNavigator}
        width={NAVIGATOR_BOX_WIDTH}
      />
    </Box>
  )
}

export default Pagination
