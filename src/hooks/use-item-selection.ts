import {Dispatch, SetStateAction, useCallback, useState} from 'react'

type UseItemSelection<T> = {
  selectItem: (itemId: T) => void
  selectedItems: T[]
  setSelectedItems: Dispatch<SetStateAction<T[]>>
}
const useItemSelection = <T = string>(
  defaultSelectedItems?: T[],
  min?: number,
): UseItemSelection<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(
    defaultSelectedItems || [],
  )

  const handleOnSelectItem = useCallback(
    (itemId: T): void => {
      const isSelected = selectedItems.includes(itemId)

      let newSelectedItems = []

      if (isSelected) {
        newSelectedItems =
          typeof min === 'number' && selectedItems.length <= min
            ? [...selectedItems]
            : selectedItems.filter((item) => item != itemId)
      } else {
        newSelectedItems = [...selectedItems, itemId]
      }

      setSelectedItems(newSelectedItems)
    },
    [min, selectedItems],
  )

  return {
    selectItem: handleOnSelectItem,
    selectedItems,
    setSelectedItems,
  }
}

export default useItemSelection
