# Theme Constants

[theme](../index.ts)에 사용되는 색상 및 규격 값이 정의된 파일 집합입니다.

모든 컴포넌트의 theme는 이 디렉토리에 정의된 값을 바탕으로 구성됩니다.

## Properties

- [UIKit Guidelines 문서](https://www.notion.so/caredoc/UIKit-Guidelines-1c713cd9843f452c8dcb0d1d24908fb9)를 토대로 작성되었습니다.

- 각 구성 요소들은 대부분 공통 타입에 따라 정의됩니다. [types.ts](./types.ts) 파일을 참고하시기 바랍니다.

### Colors [colors.ts](./colors.ts)

### Spaces [spaces.ts](./spaces.ts)

### Height [height.ts](./height.ts)

### Font-sizes [font-sizes.ts](./font-sizes.ts)

### Radius [radii.ts](./radii.ts)

### FontWeights [fontWeights.ts](./fontWeights.ts)

### IconSizes [iconSizes.ts](./iconSizes.ts)

### LineHeights [lineHeights.ts](./lineHeights.ts)

## 수정 내역

### 21.02.26

- `height` > `sizes` 변경: `height` 뿐만 아니라 `width`도 함께 관리

- `borderWidth` 추가

### 21.02.22

- 문서 및 코드 초안 작성
