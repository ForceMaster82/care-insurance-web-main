/* eslint-disable no-magic-numbers */
import React, {useMemo, useRef, useState} from 'react'
import {useOnClickOutside} from '@caredoc/utils-web'
import {zIndices} from '@caredoc/ui-master'
import {Box, Icon} from '..'
import Typography from '../Typography'
import ComboBoxLabel from './ComboBoxLabel'
import ComboBoxActionSheet from './ComboBoxActionSheet'
import {IComboBox} from './types'
import {ComboBoxItem, IComboBoxItemData} from './ComboBoxItem'
import {
  ComboBoxItems,
  ComboBoxItemsScrollableArea,
  ComboBoxSelectTypo,
} from './styles'
import {preventBrowserBack, restorePreventBrowserBack} from './utils'

export const ComboBox = <T,>({
  selectionText = '선택하기',
  isMenuUp = false,
  title,
  label,
  size = 'sm',
  items,
  onSelect,
  disabled = false,
  value,
  initialState = false,
  childrenWidth = '100%',
  error,
  ...rest
}: IComboBox<T>) => {
  const ComboBoxItemsRef = useRef(null)
  const [itemsVisible, setItemsVisible] = useState(initialState)

  const currentItem = useMemo(
    () => items.find((item) => item.data === value),
    [items, value],
  )
  const selectableItems: IComboBoxItemData<T>[] = useMemo(
    () => items.filter((item) => !item.disabled),
    [items],
  )
  const disableItems: IComboBoxItemData<T>[] = useMemo(
    () => items.filter((item) => item.disabled),
    [items],
  )
  const sortedItems = useMemo(
    () => [...selectableItems, ...disableItems],
    [disableItems, selectableItems],
  )

  const ComboBoxItemComponents = useMemo(
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
          <ComboBoxItem
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
          </ComboBoxItem>
        </Box>
      )),
    [currentItem?.data, onSelect, size, sortedItems],
  )

  const errors = useMemo(() => {
    if (!error) {
      return []
    }

    if (typeof error === 'string') {
      return [error]
    }

    return error.filter((item) => Boolean(item))
  }, [error])

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

  useOnClickOutside(ComboBoxItemsRef, () => {
    setItemsVisible(false)
  })

  return (
    <div ref={ComboBoxItemsRef}>
      <Box target="select-box-container" {...rest} position="relative">
        <ComboBoxLabel
          activeColor={{background: 'n000', border: 'n200', text: 'n700'}}
          alt="select-box-selected-item"
          disabled={disabled}
          error={errors}
          isActive={itemsVisible}
          isSelected={currentItem !== undefined}
          justifyContent="center"
          label={label}
          onClick={openHandler}
          position="relative"
          size={size}
        >
          <ComboBoxSelectTypo
            size={size}
            textColor={currentItem ? 'fontPrimary' : 'fontSecondary'}
          >
            {currentItem?.label ?? selectionText}
          </ComboBoxSelectTypo>

          <Box
            flex={1}
            justifyContent="center"
            position="absolute"
            right="16px"
          >
            <Icon
              fill="n500"
              name={isMenuUp || itemsVisible ? 'chevron-up' : 'chevron-down'}
              size={size}
            />
          </Box>
        </ComboBoxLabel>
        {errors.length > 0 && (
          <Box p="xxs">
            {errors.map((item, idx) => (
              <Typography
                key={`${label}-comboBox-error-${idx}`}
                textColor="negative"
                variant="caption2"
              >
                {item}
              </Typography>
            ))}
          </Box>
        )}
        {itemsVisible && (
          <>
            <ComboBoxItems
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
              <ComboBoxItemsScrollableArea
                borderColor="n200"
                borderRadius="sm"
                display={['none', 'block']}
                maxHeight="240px"
                overflowY="scroll"
                width="100%"
              >
                {ComboBoxItemComponents}
              </ComboBoxItemsScrollableArea>
            </ComboBoxItems>
            <ComboBoxActionSheet
              close={() => setItemsVisible(false)}
              display={['flex', 'none']}
              title={title}
            >
              {ComboBoxItemComponents}
            </ComboBoxActionSheet>
          </>
        )}
      </Box>
    </div>
  )
}

export default ComboBox
