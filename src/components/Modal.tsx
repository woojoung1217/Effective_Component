import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 함수
  title?: string; // 모달 제목
  children: React.ReactNode; // 모달 내부 콘텐츠
  closeOnBackdropClick?: boolean; // 배경 클릭 시 닫기 여부
}

const Modal = ({ isOpen, onClose, title, children, closeOnBackdropClick = true }: ModalProps) => {
  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Escape 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 막기
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto"; // 모달 닫힐 때 스크롤 허용
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // 모달이 열려 있지 않으면 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  // 모달 포털을 사용하여 body에 모달을 렌더링
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {title && <h2>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body // body에 렌더링
  );
};

export default Modal;
