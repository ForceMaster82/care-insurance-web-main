import React, {ReactElement, useState} from 'react'
import {Box, Icon, Typography} from '@caredoc/ui-web'
import {colors} from '@caredoc/ui-master'
import CaredocSignature from './svg/caredoc/Signature'

const CAREDOC_SIGNATURE_WIDTH = 84
const CAREDOC_SIGNATURE_HEIGHT = 24

const Footer = (): ReactElement => {
  const [isDetailVisible, setIsDetailVisible] = useState(false)

  const toggleDetailVisible = (): void => {
    setIsDetailVisible((prev) => !prev)
  }

  return (
    <Box alignItems="center" backgroundColor="bgSecondary" width="100%">
      <Box gap="md" px="md" py="xl" width="100%">
        <Box gap="sm">
          <CaredocSignature
            fill={colors.fontPrimary}
            height={CAREDOC_SIGNATURE_HEIGHT}
            width={CAREDOC_SIGNATURE_WIDTH}
          />
          <Box gap="xxs">
            <Typography variant="body1">B2B 제휴운영팀 1833-2799</Typography>
            <Typography textColor="fontSecondary" variant="body4">
              평일 오전 9시~오후 6시
            </Typography>
          </Box>
        </Box>
        <Box />
        <Box gap="sm">
          <Box alignItems="center" flexDirection="row" gap="xs">
            <Typography variant="caption1">(주)케어닥</Typography>
            <Box flexDirection="row" gap="xxs" onClick={toggleDetailVisible}>
              <Typography
                style={{textDecorationLine: 'underline'}}
                textColor="fontTertiary"
                variant="caption1"
              >
                {isDetailVisible ? '닫기' : '자세히 보기'}
              </Typography>
              <Icon
                fill="fontTertiary"
                name={isDetailVisible ? 'chevron-up' : 'chevron-down'}
                size="xs"
              />
            </Box>
          </Box>
          {isDetailVisible && (
            <Box gap="xs">
              <Typography textColor="fontSecondary" variant="caption2">
                대표 : 박재병 ㅣ 사업자등록번호 : 708-81-00933 ㅣ
                개인정보관리책임자 : 조형진 ㅣ 서울특별시 강남구 테헤란로 407,
                14층 (삼성동, EK타워) ㅣ 부산광역시 해운대구 센텀동로
                45(웹스빌딩) 3층 307호
              </Typography>
              <Typography textColor="fontSecondary" variant="caption2">
                ⓒ Caredoc Corp.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
