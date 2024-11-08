# ✅더 가치있고 성장 가능한 컴포넌트(책임을 명확하게)

지난 프로젝트에서 커스텀 훅과 공통 컴포넌트를 만들면서 몇 가지 아쉬운 점을 경험했습니다.
대표적인 예로

1.사용법이 복잡함: 컴포넌트의 사용법이 직관적이지 않고 어렵습니다. 문서화된 가이드나 설명이 부족해 처음 보는 사람들이 쉽게 이해하고 사용할 수 없습니다.

2.재사용성을 고려했지만 불편함: 재사용 가능한 공용 모달을 만들었음에도 불구하고, 실제로는 해당 모달을 사용하는 것보다 순수한 HTML 태그를 사용하는 것이 더 간편하다고 느껴져 재사용성이 떨어집니다.

3.디자인 변경 대응이 어려움: 컴포넌트의 스타일이 고정되어 있어, 디자인이 변경되면 수정이 어렵고 유지보수에 많은 시간이 소요됩니다. 쉽게 스타일을 커스터마이징할 수 있는 구조가 부족합니다.

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

<hr/>

- **툴팁 (ToolTip)**

  - 버튼 혹은 요소에 클릭 했을 시 메시지를 보여주는 컴포넌트입니다.

  ```jsx
  // 툴팁 인터페이스
  interface Props {
    title: string;
    tooltipItem: string;
    triggerEvent?: "hover" | "click"; // 동작 방식 유연성 추가
    position?: "top" | "bottom" | "left" | "right"; // 위치 지정 가능성 추가
  }
  ```

- **입력 필드 (Input Field)**

  - 텍스트, 비밀번호 등 다양한 형태의 입력 필드를 관리하는 컴포넌트입니다.

  ```jsx
  interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validation?: any;
    error?: FieldError;
  }
  ```

- **폼 (Form)**

  - 폼의 레이아웃과 유효성 검사 등을 처리하는 컴포넌트입니다.
  - react-hook-form 라이브러리를 사용해 각 인풋에 대한 validation을 효율적으로 관리 할 수 있도록 개선했습니다.

- **퍼널 (funnel)**

  - 토스에서 사용하는 설문조사 패턴을 사용하는 컴포넌트입니다.
  - 전역 상태를 사용하지 않고 다양한 입력들을 한 페이지에서 처리 할 수 있습니다. (응집도)
  - 디자인 변경이나 컴포넌트 변경에 빠르게 대처 할 수 있습니다.

  - 개선
    기존 방식으로는 단일 URL로 브라우저가 제공하는 뒤로가기 (히스토리) 사용이 어려웠으나
    next 의 Navigation 기능을 사용해 해결 했습니다.

- **알림/토스트 (Alert/Toast)**

  - 사용자에게 알림 메시지를 제공하는 컴포넌트입니다.

  - 개선
    zustand 를 사용한 전역 상태관리로 알림의 메시지,타임아웃,삭제 등 관리하도록 구현 했습니다.
    이후 간단하게 어느 페이지에서든 간단하게 사용 할 수 있도록 개선 했습니다.

- **드롭다운 (Dropdown)**

  - 선택 가능한 항목을 드롭다운 목록으로 표시하는 컴포넌트입니다.

  - 개선
    드랍다운 된 이후 내용은 잘 변경 되지만 드랍다운 밖 요소를 눌렀을 때 드랍다운이 닫히지 않는 오류가 있음
    이를 개선하기 위해 useDetectRef hooks 을 구현

  ```jsx
        /\*_ ref 외부 요소를 눌렀을 때 드랍다운을 닫도록 도와주는 함수 _/

    const useDetectRef = (ref: RefObject<HTMLElement>): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
      // dom object인 ref 를 인수로 받아온다
    const [isOpen, setIsOpen] = useState(false);
     // 열림상태 default = false

        useEffect(() => {
        // 화면에 클릭 요소가 일어나면
        const handleClick = (e: MouseEvent): void => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          // 현재 ref요소가 있고 클릭된 요소를 비교해서 포함하고 있지 않으면
        setIsOpen(!isOpen);
          // 화면을 닫도록 => 화면 밖을 누른다는 의미
        }
        };

        if (isOpen) {
          window.addEventListener("click", handleClick);
          // 이벤트 등록
        }

        return () => {
          window.removeEventListener("click", handleClick);
        };

    }, [isOpen, ref]);

    return [isOpen, setIsOpen];
    };

    export default useDetectRef;
  ```

  이 후 옵션의 갯수가 유동적으로 변할 수 있어 사용 하는 부분에서 options 프롭을 string [] 로 받도록 변경

- **카드 (Card)**

  - 정보나 컨텐츠를 카드 형식으로 표시하는 컴포넌트입니다.

    ```jsx
    interface CardProps {
      title: string;
      image: string;
      description: string;
      link?: string;
    }
    ```

- **알림 (alert)**

  - 애플리케이션의 네비게이션을 위한 바 컴포넌트입니다.

- **사이드바 (Sidebar)**

  - 애플리케이션의 사이드 메뉴를 제공하는 컴포넌트입니다.

- **파일 업로드 (File Upload)**

  - 파일을 업로드할 수 있는 컴포넌트입니다.


