import React from "react";

interface StepProps {
  isVisible: boolean; // 'if' 대신 사용
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ isVisible, children }) => {
  if (isVisible) {
    return <>{children}</>; // Fragment로 children을 감싸서 반환
  }
  return null; // isVisible이 false일 경우 null 반환
};

export default Step;
