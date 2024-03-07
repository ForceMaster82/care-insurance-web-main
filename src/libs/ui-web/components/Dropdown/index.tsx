/* eslint-disable no-magic-numbers */
import React, {useMemo, useRef, useState} from 'react'
import {useOnClickOutside} from '@caredoc/utils-web'
import {zIndices} from '@caredoc/ui-master'
import {Box, Icon} from '..'
import {preventBrowserBack, restorePreventBrowserBack} from '../ComboBox/utils'
import DropdownLabel from './DropdownLabel'
import DropdownActionSheet from './DropdownActionSheet'
import {IDropdown} from './types'
import {DropdownItem, IDropdownItemData} from './DropdownItem'
import {DropdownItems, DropdownItemsScrollableArea} from './styles'

/**
 *
 * @deprecated use ComboBox
 */
export const Dropdown = <T,>({
  selectionText = '선택',
  isMenuUp = false,
  title,
  label,
  size = 'sm',
  items,
  onSelect,
  disabled = false,
  value,
  childrenWidth = '100%',
  ...rest
}: IDropdown<T>) => {
  const dropdownItemsRef = useRef(null)
  const [itemsVisible, setItemsVisible] = useState(false)
  const currentItem = useMemo(
    () => items.find((item) => item.data === value),
    [items, value],
  )
  const selectableItems: IDropdownItemData<T>[] = useMemo(
    () => items.filter((item) => !item.disabled),
    [items],
  )
  const disableItems: IDropdownItemData<T>[] = useMemo(
    () => items.filter((item) => item.disabled),
    [items],
  )
  const sortedItems = useMemo(
    () => [...selectableItems, ...disableItems],
    [disableItems, selectableItems],
  )

  const dropdownItemComponents = useMemo(
    () =>
      sortedItems.map((item, index) => (
        <Box
          key={`select-item-${index}-${item.label}`}
          onClick={() => {
            if (item.disabled && item.handleOnDisabled) {
              item.handleOnDisabled()
            }
          }}
        >
          <DropdownItem
            badge={item.badge}
            disabled={item.disabled}
            isFirst={index === 0}
            isSelected={item.data === currentItem?.data}
            key={`select-item-${index}-${item.label}`}
            onClick={() => {
              onSelect(item.data)
              setItemsVisible(false)
            }}
            size={size}
          >
            {item.label}
          </DropdownItem>
        </Box>
      )),
    [currentItem?.data, onSelect, size, sortedItems],
  )
  const openHandler = () => {
    if (disabled) {
      return
    }

    preventBrowserBack(() => {
      setItemsVisible(false)
      restorePreventBrowserBack()
    })

    setItemsVisible(!itemsVisible)
  }

  useOnClickOutside(dropdownItemsRef, () => {
    setItemsVisible(false)
  })

  return (
    <div ref={dropdownItemsRef}>
      <Box
        target="select-box-container"
        {...rest}
        backgroundColor={disabled ? 'n100' : 'bgPrimary'}
        position="relative"
      >
        <DropdownLabel
          activeColor={{background: 'n000', border: 'n200', text: 'n700'}}
          alt="select-box-selected-item"
          disabled={disabled}
          isActive={itemsVisible}
          isSelected={currentItem !== undefined}
          justifyContent="center"
          label={label}
          onClick={openHandler}
          position="relative"
          size={size}
        >
          {currentItem?.label ?? selectionText}
          <Box
            flex={1}
            justifyContent="center"
            position="absolute"
            right="16px"
          >
            <Icon
              name={isMenuUp || itemsVisible ? 'chevron-up' : 'chevron-down'}
              size={size}
            />
          </Box>
        </DropdownLabel>
        {itemsVisible && (
          <>
            <DropdownItems
              backgroundColor="n000"
              border="1px solid"
              borderColor="n200"
              borderRadius="sm"
              elevation="elevation-5"
              flexDirection={isMenuUp ? 'column-reverse' : 'column'}
              isMenuUp={isMenuUp}
              position="absolute"
              size={size}
              variant="shadow"
              width={childrenWidth}
              zIndex={zIndices.popup}
            >
              <DropdownItemsScrollableArea
                borderColor="n200"
                borderRadius="sm"
                display={['none', 'block']}
                maxHeight="240px"
                overflowY="scroll"
                width="100%"
              >
                {dropdownItemComponents}
              </DropdownItemsScrollableArea>
            </DropdownItems>
            <DropdownActionSheet
              close={() => setItemsVisible(false)}
              display={['flex', 'none']}
              title={title}
            >
              {dropdownItemComponents}
            </DropdownActionSheet>
          </>
        )}
      </Box>
    </div>
  )
}

export default Dropdown
