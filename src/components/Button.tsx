import React from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string; //  들어갈 이름
  variant?: string; // 버튼의 색상이나 추가 스타일
  disabled?: boolean; // 비활성화 상태를 위한 옵션 추가
  onClick?: () => void; // 클릭 핸들러 추가
  type?: "button" | "submit" | "reset"; // 버튼의 타입을 지정
}

const Button = ({ text, variant = "", disabled = false, type = "button", onClick }: Props) => {
  return (
    <button className={`${styles.btn} ${styles[variant] || ""}`} disabled={disabled} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
