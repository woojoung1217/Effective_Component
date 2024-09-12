# ✅성장 가능한 컴포넌트 만들기(책임을 명확하게)

지난 프로젝트에서 커스텀 훅과 공통 컴포넌트를 만들면서 몇 가지 아쉬운 점을 경험했습니다.
대표적인 예로

1.사용법이 복잡함: 모달 컴포넌트의 사용법이 직관적이지 않고 어렵습니다. 문서화된 가이드나 설명이 부족해 처음 보는 사람들이 쉽게 이해하고 사용할 수 없습니다.

2.재사용성을 고려했지만 불편함: 재사용 가능한 공용 모달을 만들었음에도 불구하고, 실제로는 해당 모달을 사용하는 것보다 순수한 HTML 태그를 사용하는 것이 더 간편하다고 느껴져 재사용성이 떨어집니다.

3.디자인 변경 대응이 어려움: 모달 컴포넌트의 스타일이 고정되어 있어, 디자인이 변경되면 수정이 어렵고 유지보수에 많은 시간이 소요됩니다. 쉽게 스타일을 커스터마이징할 수 있는 구조가 부족합니다.

**[페이지로 보기]**

🔗 https://effective-component.vercel.app/

> 이를 해결하기 위해 정한 컴포넌트 추상화 규칙

# 규칙

1. Headless 기반의 추상화하기
   변하는 것 VS 상대적으로 변하지 않는 것
2. 한 가지 역할만 하기
   또는 한 가지 역할만 하는 컴포넌트의 조합으로 구성하기
3. 도메인 분리하기
   도메인을 포함하는 컴포넌트와 그렇지 않은 컴포넌트 분리하기

모든 컴포넌트를 구현 할 때 최대한 고려하면서 만들기를 목표로 합니다.

## 컴포넌트 카테고리

⚠️ 단순 기능을 위해 만든 컴포넌트들로 디자인은 고려하지 않음.

다양한 애플리케이션에서 유용하게 사용될 수 있는 공용 컴포넌트 카테고리는 다음과 같습니다:

- **버튼 (Button)**

  - 다양한 스타일과 기능을 갖춘 버튼 컴포넌트입니다.

  - 요구사항 & 고려사항

| 이름       | 타입     | 기본값   | 설명                                                      |
| ---------- | -------- | -------- | --------------------------------------------------------- |
| `text`     | `string` | -        | 버튼 안에 들어갈 텍스트                                   |
| `styleID`  | `string` | -        | 각기 다른 스타일 지정 위함, 스타일은 `.module.css`에 지정 |
| `onClick`  | `func`   | -        | 버튼이 클릭될 때 호출될 이벤트 핸들러 지정                |
| `disabled` | `bool`   | `false`  | 버튼 비활성/활성 여부를 결정하는 부울 값                  |
| `type`     | `string` | `button` | 버튼의 타입을 지정 (`button`, `submit`, `reset`)          |

- 문제점
  variant로 전달된 값이 styles[variant]에서 찾을 수 없는 경우, 빈 문자열로 대체 되도록 설계 하지만 variant에 예상치 못한 값이 전달되면 스타일이 적용되지 않아서 예상치 못한 결과가 나올 수 있습니다.

- 해결
  variant에 대한 유효성 검사를 추가하거나, 미리 정의된 값으로만 스타일을 적용하도록 제한하는 방식으로 해결
  variant에 대해 타입을 사용해 명시적인 제한을 두도록 변경 했습니다.

<hr/>

- **모달 (Modal)**

  - 화면 중앙에 팝업 창을 띄우는 컴포넌트입니다.

  - 요구사항 & 고려사항
    접근성 문제: 모달이 다른 요소들과 DOM 구조를 공유하게 되면 포커스 트래핑(focus trapping)과 같은 접근성 기능을 구현하는 것이 어려울 수 있습니다. 포탈을 사용하면 모달이 별도의 DOM 트리에서 관리되어, 키보드 내비게이션이나 화면 판독기와 같은 기능을 더 쉽게 제어할 수 있습니다.

    CSS 스타일링 충돌: 모달을 구현하는 부모 컴포넌트의 스타일이 모달 내부로 전파될 수 있습니다. 모달은 일반적으로 독립적인 스타일링이 필요하지만, 포탈 없이 구현하면 상위 컴포넌트의 스타일이 의도치 않게 영향을 미칠 수 있습니다.

    모달의 열고 닫힘 상태 : 항상 모달을 사용하기 위해서 사용하는 부분에서 open, close 함수를 만들어야 했는데 모달의 상태를 전역 상태 라이브러리로 저장하고 관리 하도록 합니다. (zustand)

| 이름                   | 타입              | 기본값  | 설명                            |
| ---------------------- | ----------------- | ------- | ------------------------------- |
| `isOpen`               | `bool`            | -       | 모달의 상태                     |
| `onClose`              | `func`            | -       | 모달의 닫기 함수                |
| `title`                | `string`          | -       | 모달에 들어 갈 제목             |
| `children`             | `React.ReactNode` | `false` | 모달의 내부 콘텐츠              |
| `closeOnBackdropClick` | `bool`            | `click` | 모달의 뒷요소 클릭 시 닫기 여부 |

- 해결
  포탈을 사용하면 모달이 부모 컴포넌트의 DOM 계층에 영향을 받지 않고, z-index 문제나 레이아웃 문제를 쉽게 해결할 수 있었습니다.

- **입력 필드 (Input Field)**

  - 텍스트, 비밀번호 등 다양한 형태의 입력 필드를 관리하는 컴포넌트입니다.

- **폼 (Form)**

  - 폼의 레이아웃과 유효성 검사 등을 처리하는 컴포넌트입니다.

- **로딩 스피너 (Loading Spinner)**

  - 데이터 로딩 시 사용자에게 피드백을 제공하는 컴포넌트입니다.

- **알림/토스트 (Alert/Toast)**

  - 사용자에게 알림 메시지를 제공하는 컴포넌트입니다.

- **탭 (Tabs)**

  - 컨텐츠를 탭으로 구분하여 표시하는 컴포넌트입니다.

- **드롭다운 (Dropdown)**

  - 선택 가능한 항목을 드롭다운 목록으로 표시하는 컴포넌트입니다.

- **카드 (Card)**

  - 정보나 컨텐츠를 카드 형식으로 표시하는 컴포넌트입니다.

- **네비게이션 바 (Navbar)**

  - 애플리케이션의 네비게이션을 위한 바 컴포넌트입니다.

- **사이드바 (Sidebar)**

  - 애플리케이션의 사이드 메뉴를 제공하는 컴포넌트입니다.

- **경고 대화상자 (Confirmation Dialog)**

  - 사용자에게 확인을 요청하는 대화상자 컴포넌트입니다.

- **파일 업로드 (File Upload)**

  - 파일을 업로드할 수 있는 컴포넌트입니다.

- **페이지네이션 (Pagination)**

  - 페이지를 나누어 표시하는 컴포넌트입니다.

- **테이블 (Table)**
  - 데이터를 표 형식으로 표시하는 컴포넌트입니다.

## 사용 방법

각 컴포넌트는 다음과 같은 방법으로 사용할 수 있습니다:

1. **설치 및 설정**

   - 컴포넌트를 설치하고 필요한 설정을 구성합니다.

2. **사용 예시**

   - 각 컴포넌트를 사용하는 방법과 예시 코드를 제공합니다.

3. **기능 및 속성**

   - 컴포넌트의 주요 기능과 지원하는 속성을 설명합니다.

4. **커스터마이징**
   - 컴포넌트를 커스터마이즈하는 방법을 안내합니다.
