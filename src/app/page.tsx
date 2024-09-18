"use client";

import Button from "@/components/Button";
import styles from "./main.module.scss";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/ModalStore";
import ToolTip from "@/components/ToolTip";
import Link from "next/link";
import { useToastStore } from "@/store/ToastStore";
import { ToastContainer } from "@/components/useToast";

export default function Home() {
  const handleOnClick = () => {
    console.log("hello");
  };

  const { isOpen, openModal, closeModal } = useModalStore();

  const { addToast } = useToastStore();

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
          <h1> 입력 필드&폼 컴포넌트</h1>
          {/* <MyForm /> */}
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
    </div>
  );
}
