"use client";

import Button from "@/components/Button";
import styles from "./main.module.scss";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/ModalStore";
import ToolTip from "@/components/ToolTip";
// import Link from "next/link";
import { useToastStore } from "@/store/ToastStore";
import { ToastContainer } from "@/components/useToast";
import Link from "next/link";
import DropDown from "@/components/DropDown";
import Card from "@/components/Card";

export default function Home() {
  const handleOnClick = () => {
    console.log("hello");
  };

  const { isOpen, openModal, closeModal } = useModalStore();

  const { addToast } = useToastStore();

  // 드랍다운 속성

  const options = ["옵션 1", "옵션 2", "옵션 3", "옵션 4"];

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.title}>더 가치있는 컴포넌트 만들기</div>

      <div className={styles.components}>
        <div className={styles.items}>
          <h1> 버튼 컴포넌트</h1>
          <Button text="Primary Button" onClick={handleOnClick} />
          <Button text="Secondary Button" variant="secondary" onClick={handleOnClick} />
          <Button text="Sucess Button" variant="succes" onClick={handleOnClick} />
          <Button text="Disabled Button" disabled={true} onClick={handleOnClick} />

          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/Button.tsx"} target="_blank">
            코드
          </a>
        </div>
        <div className={styles.items}>
          <h1> 모달 컴포넌트</h1>
          <Button text="Open Modal" onClick={openModal} />
          <Modal isOpen={isOpen} onClose={closeModal} title="Sample Modal">
            <p>모달 이에요. 잘 부탁 드립니다.</p>
          </Modal>
          <Button text="Second Modal" variant="secondary" onClick={openModal} />
          <Modal isOpen={isOpen} onClose={closeModal} title="Sample Modal2">
            <p>테스트 용</p>
          </Modal>
          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/Modal.tsx"} target="_blank">
            코드
          </a>
        </div>
        <div className={styles.items}>
          <h1> 툴팁 컴포넌트</h1>
          <ToolTip title="hover me!" tooltipItem="툴팁 아이템 입니다." position="top" />
          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/ToolTip.tsx"} target="_blank">
            코드
          </a>
        </div>
      </div>

      <div className={styles.components}>
        <div className={styles.items}>
          <h1> 입력 필드&폼 컴포넌트 오류 수정중</h1>
          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/InputField.tsx"} target="_blank">
            코드
          </a>
        </div>
        <div className={styles.items}>
          <h1> 퍼널 : 설문조사 패턴</h1>
          <Link href="/funnel">퍼널로 페이지 이동 (모바일 화면으로 봐주세요)</Link>
          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/InputField.tsx"} target="_blank">
            코드
          </a>
        </div>
        <div className={styles.items}>
          <h1>토스트 컴포넌트 (알림)</h1>
          <button
            onClick={() => {
              addToast("This is a success message", "success");
            }}
          >
            Show Toast
          </button>

          <button
            onClick={() => {
              addToast("This is a error message", "error");
            }}
          >
            Error Toast
          </button>

          <button
            onClick={() => {
              addToast("This is a info message", "info");
            }}
          >
            Error Toast
          </button>
          <ToastContainer />
        </div>
      </div>

      <div className={styles.components}>
        <div className={styles.items}>
          <h1> 드롭다운 컴포넌트 </h1>
          <DropDown options={options} />
        </div>
        <div className={styles.items}>
          <h1> 카드 컴포넌트 </h1>
          <Card
            title={"제목1"}
            description="설명"
            link="/"
            image="data:image/png;base64,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"
          />
        </div>
        <div className={styles.items}>
          <h1> Ex</h1>
        </div>
      </div>
    </div>
  );
}
