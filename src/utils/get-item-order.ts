const getItemOrder = (
  totalItemCount: number,
  currentPage: number,
  itemPerPage: number,
  index: number,
): number => {
  return totalItemCount - (index + (currentPage - 1) * itemPerPage)
}

export default getItemOrder
