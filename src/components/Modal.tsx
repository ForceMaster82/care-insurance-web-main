/* eslint-disable unicorn/filename-case */
import {CustomSizeKey, DefaultSizes, space, zIndices} from '@caredoc/ui-master'
import {Box, Button, IButton, Icon, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {modalWidths} from '~constants'

interface IProps {
  buttonProps?: IButton
  buttonText?: string
  closeIndicationType?: 'button' | 'icon'
  description?: string
  disabled?: boolean
  loading?: boolean
  modalHeight?: number | string
  modalWidth?: keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg' | 'xl'>
  onClose?: () => void
  onSubmit?: () => void
  pt?: 'none' | CustomSizeKey
  px?: 'none' | CustomSizeKey
  title?: string
  visible?: boolean
}

const Modal = (props: PropsWithChildren<IProps>): ReactElement | null => {
  const {
    title,
    description,
    visible = true,
    onClose,
    children,
    modalHeight,
    modalWidth = 'sm',
    buttonText = '확인',
    buttonProps,
    onSubmit,
    disabled = false,
    px = 'lg',
    loading = false,
    closeIndicationType = 'button',
  } = props

  const handleOnClose = (): void => {
    if (!onClose) {
      return
    }
    onClose()
  }

  // 모달에 스크롤이 생겼을 때 컨텐츠가 밀려나가는 현상때문에 모달의 px값을 제외한 width를 minWidth로 준다
  const contentMinWidth = useMemo(
    () =>
      px === 'none'
        ? modalWidths[modalWidth]
        : modalWidths[modalWidth] - space[px] * 2,
    [modalWidth, px],
  )

  if (!visible) {
    return null
  }

  return (
    <Root
      bottom={0}
      left={0}
      position="fixed"
      right={0}
      top={0}
      zIndex={zIndices.popup}
    >
      <Box
        backgroundColor="n700"
        bottom={0}
        left={0}
        opacity={0.4}
        position="absolute"
        right={0}
        top={0}
        zIndex={zIndices.popup}
      />
      <Box
        alignItems="flex-end"
        justifyContent="center"
        left={0}
        minHeight="100vh"
        position="absolute"
        top={0}
        width="100vw"
      >
        {/** modal */}
        <ModalBox
          backgroundColor="bgPrimary"
          borderRadius="xs"
          gap="lg"
          height={modalHeight || 'auto'}
          justifyContent="space-between"
          maxHeight="100vh"
          py="xl"
          zIndex={zIndices.overlay}
        >
          <Box flex={1} gap="lg" overflowY="auto">
            <Box gap="sm" px="lg">
              {/** header */}
              <Box
                alignItems="center"
                flexDirection="row"
                gap="xs"
                justifyContent="space-between"
              >
                {title && (
                  <Box>
                    <Typography variant="heading6">{title}</Typography>
                  </Box>
                )}
                {closeIndicationType === 'icon' && (
                  <Box onClick={handleOnClose}>
                    <Icon name="close" size="xl" />
                  </Box>
                )}
              </Box>

              {/** description */}
              {description && (
                <Box>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              )}
            </Box>

            {/** body */}
            <Box
              borderRadius="sm"
              flex={1}
              overflowX="hidden"
              overflowY="auto"
              px={px}
              width={contentMinWidth}
            >
              {children}
            </Box>
          </Box>

          {/** button */}
          <Box flexDirection="row" gap="xs" px="lg">
            {closeIndicationType === 'button' && (
              <Button
                color="fontSecondary"
                flex={1}
                onClick={onClose}
                size="md"
                variant="tertiary"
              >
                취소
              </Button>
            )}
            {onSubmit && (
              <Button
                color="primary"
                disabled={disabled}
                flex={1}
                onClick={onSubmit}
                size="md"
                {...buttonProps}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </ModalBox>
      </Box>
    </Root>
  )
}

const Root = styled(Box)``

const ModalBox = styled(Box)`
  margin: 0px auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-height: 90vh;
`

export default Modal
