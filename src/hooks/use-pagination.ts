import {useState} from 'react'

interface IUsePagination {
  pageNumber: number
  resetPageNumber: () => void
  setPageNumber: (page: number) => void
}

const DEFAULT_PAGE_NUMBER = 1

const usePagination = (defaultPageNumber?: number | null): IUsePagination => {
  const [pageNumber, setPageNumber] = useState(
    defaultPageNumber || DEFAULT_PAGE_NUMBER,
  )

  const handleOnChangePage = (page: number): void => {
    setPageNumber(page)
  }

  const handleOnResetPage = (): void => {
    setPageNumber(DEFAULT_PAGE_NUMBER)
  }

  return {
    pageNumber,
    resetPageNumber: handleOnResetPage,
    setPageNumber: handleOnChangePage,
  }
}

export default usePagination
