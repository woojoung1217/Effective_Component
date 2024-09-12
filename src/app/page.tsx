"use client";

import Button from "@/components/Button";
import styles from "./main.module.scss";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/ModalStore";

export default function Home() {
  const handleOnClick = () => {
    console.log("hello");
  };

  const { isOpen, openModal, closeModal } = useModalStore();

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.title}>더 가치있는 컴포넌트 만들기</div>

      <div className={styles.components}>
        <div className={styles.items}>
          <h1>공용 버튼 컴포넌트</h1>
          <Button text="Primary Button" onClick={handleOnClick} />
          <Button text="Secondary Button" variant="secondary" onClick={handleOnClick} />
          <Button text="Sucess Button" variant="succes" onClick={handleOnClick} />
          <Button text="Disabled Button" disabled={true} onClick={handleOnClick} />

          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/Button.tsx"} target="_blank">
            github
          </a>
        </div>
        <div className={styles.items}>
          <h1>공용 모달 컴포넌트</h1>
          <Button text="Open Modal" onClick={openModal} />
          <Modal isOpen={isOpen} onClose={closeModal} title="Sample Modal">
            <p>모달 이에요. 잘 부탁 드립니다.</p>
          </Modal>
          <a href={"https://github.com/woojoung1217/Effective_Component/blob/main/src/components/Modal.tsx"} target="_blank">
            github
          </a>
        </div>
        <div className={styles.items}></div>
      </div>
    </div>
  );
}
